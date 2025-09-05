package ao.isptec.multimedia.controller;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.*;
import java.text.Normalizer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/ficheiros")
public class FicheiroController {

        @PostMapping("/upload")
        public ResponseEntity<String> upload(
                        @RequestParam("file") MultipartFile file,
                        @RequestParam("tipo") String tipo // musica ou video
        ) {
                try {
                        String supabaseUrl = "https://ndjjninixxxhxkxokjhb.supabase.co";
                        String bucket = "ispmedia";
                        String pastaDestino = "Recursos/" + (tipo.equals("video") ? "videos/" : "musicas/");
                        String anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kampuaW5peHh4aHhreG9ramhiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDAwMjMxMCwiZXhwIjoyMDY5NTc4MzEwfQ.EtsD_0YQe2baPb-3CHb1fcw_DMU86hKIsOF-U2BBxus"; // ⚠️
                                                                                                                                                                                                                                                                        // colocar
                                                                                                                                                                                                                                                                        // service_role_key,
                                                                                                                                                                                                                                                                        // não
                                                                                                                                                                                                                                                                        // anon

                        RestTemplate restTemplate = new RestTemplate();

                        // 1. Nome único
                        String nomeOriginal = file.getOriginalFilename();
                        nomeOriginal = normalizarNomeOriginal(nomeOriginal);

                        String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf('.'));
                        String baseNome = nomeOriginal.substring(0, nomeOriginal.lastIndexOf('.'));
                        String nomeUnico = baseNome + "_" + UUID.randomUUID() + extensao;

                        // 2. Upload do ficheiro original para Supabase
                        String uploadUrl = supabaseUrl + "/storage/v1/object/" + bucket + "/" + pastaDestino
                                        + nomeUnico;

                        HttpHeaders headers = new HttpHeaders();
                        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                        headers.set("Authorization", "Bearer " + anonKey);

                        HttpEntity<byte[]> requestEntity = new HttpEntity<>(file.getBytes(), headers);

                        ResponseEntity<String> uploadResponse = restTemplate.exchange(
                                        uploadUrl,
                                        HttpMethod.POST,
                                        requestEntity,
                                        String.class);

                        if (!uploadResponse.getStatusCode().is2xxSuccessful()) {
                                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                                .body("Erro ao enviar ficheiro para Supabase.");
                        }

                        // 3. Download temporário para processar no FFmpeg
                        Path tempInput = Files.createTempFile("input_", extensao);
                        file.transferTo(tempInput.toFile());

                        Path pastaTemp = Files.createTempDirectory("hls_");
                        String nomeSemExtensao = nomeUnico.substring(0, nomeUnico.lastIndexOf('.'));
                        Path caminhoOutput = pastaTemp.resolve(nomeSemExtensao + ".m3u8");

                        List<String> comando;

                        if (tipo.equals("video")) {
                                comando = List.of(
                                                "ffmpeg",
                                                "-i", tempInput.toString(),
                                                "-c:v", "libx264",
                                                "-crf", "23",
                                                "-preset", "medium",
                                                "-profile:v", "baseline",
                                                "-level", "3.0",
                                                "-start_number", "0",
                                                "-hls_time", "10",
                                                "-hls_list_size", "0",
                                                "-f", "hls",
                                                caminhoOutput.toString());
                        } else {
                                comando = List.of(
                                                "ffmpeg",
                                                "-i", tempInput.toString(),
                                                "-vn",
                                                "-c:a", "aac",
                                                "-b:a", "128k",
                                                "-hls_time", "10",
                                                "-hls_list_size", "0",
                                                "-f", "hls",
                                                caminhoOutput.toString());
                        }

                        ProcessBuilder pb = new ProcessBuilder(comando);
                        pb.redirectErrorStream(true);
                        Process processo = pb.start();

                        try (BufferedReader reader = new BufferedReader(
                                        new InputStreamReader(processo.getInputStream()))) {
                                String linha;
                                while ((linha = reader.readLine()) != null) {
                                        System.out.println(linha);
                                }
                        }

                        int status = processo.waitFor();
                        if (status != 0) {
                                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                                .body("Erro ao gerar HLS com FFmpeg.");
                        }

                        // 4. Upload dos ficheiros HLS (m3u8 + ts) para Supabase
                        Files.walk(pastaTemp).filter(Files::isRegularFile).forEach(path -> {
                                try {
                                        String nomeFicheiro = path.getFileName().toString();
                                        String uploadSegmentUrl = supabaseUrl + "/storage/v1/object/" + bucket + "/"
                                                        + pastaDestino + nomeSemExtensao + "/" + nomeFicheiro;

                                        HttpEntity<byte[]> segmentEntity = new HttpEntity<>(Files.readAllBytes(path),
                                                        headers);

                                        restTemplate.exchange(uploadSegmentUrl, HttpMethod.POST, segmentEntity,
                                                        String.class);
                                } catch (Exception e) {
                                        e.printStackTrace();
                                }
                        });

                        // 5. URL pública final do m3u8
                        String urlFinal = supabaseUrl + "/storage/v1/object/" + bucket + "/" + pastaDestino
                                        + nomeSemExtensao + "/" + nomeSemExtensao + ".m3u8";

                        return ResponseEntity.ok(urlFinal);

                } catch (Exception e) {
                        e.printStackTrace();
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                        .body("Erro ao fazer upload.");
                }
        }

        @PostMapping("/baixar")
        public ResponseEntity<Resource> baixarFicheiroOriginal(
                        @RequestParam("caminhoM3U8") String caminhoM3U8,
                        @RequestParam("extensaoOriginal") String extensaoOriginal) {

                try {
                        // Exemplo: remover a última pasta + ficheiro
                        int lastSlashIndex = caminhoM3U8.lastIndexOf('/');
                        int penultimoSlashIndex = caminhoM3U8.lastIndexOf('/', lastSlashIndex - 1);

                        // Pega a base até à pasta do vídeo
                        String baseUrl = caminhoM3U8.substring(0, penultimoSlashIndex);

                        // Nome da pasta (ex: video1)
                        String pastaVideo = caminhoM3U8.substring(penultimoSlashIndex + 1, lastSlashIndex);

                        // Monta a nova URL: base + "/" + pasta + "." + extensão
                        String urlFinal = baseUrl + "/" + pastaVideo + "." + extensaoOriginal;

                        // Conecta no Supabase
                        URL url = new URL(urlFinal);
                        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                        connection.setRequestMethod("GET");

                        if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                                return ResponseEntity.notFound().build();
                        }

                        byte[] fileBytes = connection.getInputStream().readAllBytes();
                        connection.disconnect();

                        // Nome do ficheiro para download
                        String nomeFicheiro = pastaVideo + "." + extensaoOriginal;

                        ByteArrayResource resource = new ByteArrayResource(fileBytes);

                        return ResponseEntity.ok()
                                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                                        .header(HttpHeaders.CONTENT_DISPOSITION,
                                                        "attachment; filename=\"" + nomeFicheiro + "\"")
                                        .body(resource);

                } catch (IOException e) {
                        e.printStackTrace();
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                }
        }

        @PostMapping("/duplicarArquivo")
        public ResponseEntity<String> duplicarArquivo(
                        @RequestParam("caminho") String caminhoOriginalUrl,
                        @RequestParam("tipo") String tipo) {
                try {
                        RestTemplate restTemplate = new RestTemplate();

                        // 1. Baixa o ficheiro original do Supabase
                        ResponseEntity<byte[]> response = restTemplate.exchange(
                                        caminhoOriginalUrl,
                                        HttpMethod.GET,
                                        new HttpEntity<>(new HttpHeaders()),
                                        byte[].class);

                        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                                .body("Arquivo original não encontrado no Supabase.");
                        }

                        byte[] conteudo = response.getBody();

                        // 2. Extrai nome do ficheiro (só para manter a extensão correta)
                        String nomeOriginal = limparNomeArquivo(
                                        caminhoOriginalUrl.substring(caminhoOriginalUrl.lastIndexOf('/') + 1));

                        // 3. Cria MultipartFile "manual" a partir do byte[]
                        MultipartFile multipartFile = new MultipartFile() {
                                @Override
                                public String getName() {
                                        return nomeOriginal;
                                }

                                @Override
                                public String getOriginalFilename() {
                                        return nomeOriginal;
                                }

                                @Override
                                public String getContentType() {
                                        return "application/octet-stream";
                                }

                                @Override
                                public boolean isEmpty() {
                                        return conteudo.length == 0;
                                }

                                @Override
                                public long getSize() {
                                        return conteudo.length;
                                }

                                @Override
                                public byte[] getBytes() {
                                        return conteudo;
                                }

                                @Override
                                public InputStream getInputStream() {
                                        return new ByteArrayInputStream(conteudo);
                                }

                                @Override
                                public void transferTo(File dest) throws IOException {
                                        try (FileOutputStream fos = new FileOutputStream(dest)) {
                                                fos.write(conteudo);
                                        }
                                }
                        };

                        // 4. Reaproveita o método upload (já vai duplicar com UUID)
                        return upload(multipartFile, tipo);

                } catch (Exception e) {
                        e.printStackTrace();
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                        .body("Erro ao duplicar arquivo.");
                }
        }

        @DeleteMapping("/musica/deletar")
        public ResponseEntity<String> deletarMusica(
                        @RequestParam("caminho") String caminho,
                        @RequestParam("extensao") String extensao) {
                try {
                        String supabaseUrl = "https://ndjjninixxxhxkxokjhb.supabase.co";
                        String bucket = "ispmedia";
                        String anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kampuaW5peHh4aHhreG9ramhiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDAwMjMxMCwiZXhwIjoyMDY5NTc4MzEwfQ.EtsD_0YQe2baPb-3CHb1fcw_DMU86hKIsOF-U2BBxus";

                        RestTemplate restTemplate = new RestTemplate();

                        // Remove o prefixo absoluto e fica só com o caminho relativo dentro do bucket
                        String prefixo = supabaseUrl + "/storage/v1/object/" + bucket + "/";
                        String caminhoRelativo = caminho.replace(prefixo, "");

                        // Exemplo: caminhoRelativo = Recursos/musicas/01 Destino_xxxx/01.m3u8

                        // Pasta da música (sem o ficheiro)
                        String pastaMusica = caminhoRelativo.substring(0, caminhoRelativo.lastIndexOf('/'));

                        // Nome base (última parte da pasta)
                        String nomeBase = pastaMusica.substring(pastaMusica.lastIndexOf('/') + 1);

                        // Diretório raiz (musicas ou videos)
                        String tipoMidia = pastaMusica.split("/")[1]; // "musicas" ou "videos"

                        // Caminho do ficheiro principal (ex: Recursos/musicas/Nome.mp3)
                        String caminhoFicheiroPrincipal = "Recursos/" + tipoMidia + "/" + nomeBase + "." + extensao;

                        // 🔹 1. Apagar todos os ficheiros da pasta (m3u8 + ts)
                        String listUrl = supabaseUrl + "/storage/v1/object/list/" + bucket;

                        HttpHeaders headersList = new HttpHeaders();
                        headersList.set("Authorization", "Bearer " + anonKey);
                        headersList.setContentType(MediaType.APPLICATION_JSON);

                        // body para listar ficheiros da pasta
                        Map<String, Object> listBody = new HashMap<>();
                        listBody.put("prefix", pastaMusica + "/");
                        listBody.put("limit", 100);
                        listBody.put("offset", 0); // precisa do "/" no fim

                        HttpEntity<Map<String, Object>> listRequest = new HttpEntity<>(listBody, headersList);

                        ResponseEntity<List<Map<String, Object>>> listResponse = restTemplate.exchange(
                                        listUrl,
                                        HttpMethod.POST,
                                        listRequest,
                                        new ParameterizedTypeReference<List<Map<String, Object>>>() {
                                        });

                        List<Map<String, Object>> ficheiros = listResponse.getBody();

                        for (Map<String, Object> ficheiro : ficheiros) {
                                System.out.println(ficheiro);
                        }

                        if (ficheiros != null) {
                                for (Map<String, Object> f : ficheiros) {

                                        String nomeFicheiro = (String) f.get("name");
                                        String caminhoCompleto = pastaMusica + "/" + nomeFicheiro;

                                        String deleteUrl = prefixo + caminhoCompleto;

                                        HttpHeaders headersAuth = new HttpHeaders();
                                        headersAuth.set("Authorization", "Bearer " + anonKey);

                                        HttpEntity<Void> deleteRequest = new HttpEntity<>(headersAuth);

                                        restTemplate.exchange(
                                                        deleteUrl,
                                                        HttpMethod.DELETE,
                                                        deleteRequest,
                                                        String.class);
                                }
                        }

                        // 🔹 2. Apagar também o ficheiro principal (.mp3, .wav, etc.)
                        String deletePrincipalUrl = prefixo + caminhoFicheiroPrincipal;

                        HttpHeaders headersAuth = new HttpHeaders();
                        headersAuth.set("Authorization", "Bearer " + anonKey);

                        HttpEntity<Void> deletePrincipalRequest = new HttpEntity<>(headersAuth);

                        restTemplate.exchange(
                                        deletePrincipalUrl,
                                        HttpMethod.DELETE,
                                        deletePrincipalRequest,
                                        String.class);

                        return ResponseEntity.ok("pasta associada deletadas com sucesso!");

                } catch (Exception e) {
                        e.printStackTrace();
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                        .body("Erro ao deletar música no Supabase.");
                }
        }

        public static String limparNomeArquivo(String nomeArquivo) {
                if (nomeArquivo == null || nomeArquivo.isEmpty()) {
                        return nomeArquivo;
                }

                // Remove qualquer "_<uuid>" antes da extensão
                return nomeArquivo.replaceFirst("_[a-f0-9\\-]+(?=\\.[^.]+$)", "");
        }

        public String normalizarNomeOriginal(String nomeOriginal) {

                // separa base + extensão
                String extensaoNomeOriginal = nomeOriginal.substring(nomeOriginal.lastIndexOf('.'));
                String nomeBaseNomeOriginal = nomeOriginal.substring(0, nomeOriginal.lastIndexOf('.'));

                // 🔹 Normalizar o nome base (antes da extensão)
                String nomeBaseNormalizado = Normalizer.normalize(nomeBaseNomeOriginal, Normalizer.Form.NFD)
                                .replaceAll("[\\p{InCombiningDiacriticalMarks}]", "") // remove acentos
                                .replaceAll("\\s+", "_") // troca espaços por "_"
                                .replaceAll("[^a-zA-Z0-9._-]", ""); // remove chars inválidos

                // 🔹 Reconstrói o nomeOriginal já normalizado
                String nomeOriginalFinal = nomeBaseNormalizado + extensaoNomeOriginal;

                return nomeOriginalFinal;

                // --------------------------------------------------------------
        }

}
