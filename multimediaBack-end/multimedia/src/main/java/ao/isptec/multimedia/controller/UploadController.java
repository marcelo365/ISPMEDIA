package ao.isptec.multimedia.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.text.Normalizer;
import java.util.UUID;

@RestController
@RequestMapping("/Upload") // base URL: http://localhost:8080/upload
public class UploadController {

    @PostMapping("/imagem")
    public ResponseEntity<String> uploadImagem(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "sobrescrever", defaultValue = "false") boolean sobrescrever,
            @RequestParam(value = "caminhoAntigo", required = false) String caminhoAntigo) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Arquivo vazio.");
        }

        try {
            String supabaseUrl = "https://ndjjninixxxhxkxokjhb.supabase.co";
            String bucket = "ispmedia";
            String anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kampuaW5peHh4aHhreG9ramhiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDAwMjMxMCwiZXhwIjoyMDY5NTc4MzEwfQ.EtsD_0YQe2baPb-3CHb1fcw_DMU86hKIsOF-U2BBxus";

            RestTemplate restTemplate = new RestTemplate();

            // gera sempre um nome novo para a imagem (mesmo se sobrescrever)
            String nomeOriginal = file.getOriginalFilename();
            nomeOriginal = normalizarNomeOriginal(nomeOriginal);

            String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf('.'));
            String nomeBase = nomeOriginal.substring(0, nomeOriginal.lastIndexOf('.'));
            String nomeFinal = nomeBase + "_" + UUID.randomUUID() + extensao;

            // caminho do novo ficheiro
            String novoCaminhoRelativo = "Recursos/imagens/" + nomeFinal;
            String uploadUrl = supabaseUrl + "/storage/v1/object/" + bucket + "/" + novoCaminhoRelativo;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.set("Authorization", "Bearer " + anonKey);

            HttpEntity<byte[]> requestEntity = new HttpEntity<>(file.getBytes(), headers);

            // Se for sobrescrever → apaga primeiro o antigo
            if (sobrescrever && caminhoAntigo != null && !caminhoAntigo.isBlank()) {
                String prefixo = supabaseUrl + "/storage/v1/object/" + bucket + "/";
                String caminhoRelativoAntigo = caminhoAntigo.replace(prefixo, "");

                String deleteUrl = supabaseUrl + "/storage/v1/object/" + bucket + "/" + caminhoRelativoAntigo;

                HttpHeaders deleteHeaders = new HttpHeaders();
                deleteHeaders.set("Authorization", "Bearer " + anonKey);

                HttpEntity<Void> deleteRequest = new HttpEntity<>(deleteHeaders);
                restTemplate.exchange(deleteUrl, HttpMethod.DELETE, deleteRequest, String.class);
            }

            // sempre faz POST para criar o novo ficheiro
            ResponseEntity<String> response = restTemplate.exchange(uploadUrl, HttpMethod.POST, requestEntity,
                    String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                String caminhoPublico = supabaseUrl + "/storage/v1/object/" + bucket + "/" + novoCaminhoRelativo;
                return ResponseEntity.ok(caminhoPublico);
            } else {
                return ResponseEntity.status(response.getStatusCode())
                        .body("Erro ao enviar imagem para o Supabase: " + response.getBody());
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao fazer upload para Supabase.");
        }
    }

    @PostMapping("/letra")
    public ResponseEntity<String> uploadLetra(
            @RequestParam("titulo") String tituloMusica,
            @RequestParam("letra") String letra,
            @RequestParam(value = "sobrescrever", defaultValue = "false") boolean sobrescrever,
            @RequestParam(value = "caminhoAntigo", required = false) String caminhoAntigo) {

        try {
            
            String supabaseUrl = "https://ndjjninixxxhxkxokjhb.supabase.co";
            String bucket = "ispmedia";
            String anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kampuaW5peHh4aHhreG9ramhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMDIzMTAsImV4cCI6MjA2OTU3ODMxMH0.QT0zRgpd0zkoGZ3qa3U1aK5NaAwPdfxYfCPbCfmZ3r8";

            String nomeFicheiro;

            if (sobrescrever && caminhoAntigo != null && !caminhoAntigo.isBlank()) {
                // Extrai só o nome do ficheiro da URL antiga (depois da última "/")
                nomeFicheiro = caminhoAntigo.substring(caminhoAntigo.lastIndexOf("/") + 1);
            } else {
                // Gera nome único
                String uuid = UUID.randomUUID().toString();
                String nomeBase = tituloMusica.replaceAll("[^a-zA-Z0-9\\-_]", "_");
                nomeFicheiro = nomeBase + "_" + uuid + ".txt";
            }

            // Endpoint do Supabase para letras
            String uploadUrl = supabaseUrl + "/storage/v1/object/" + bucket + "/Recursos/letras/" + nomeFicheiro;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.TEXT_PLAIN); // texto plano
            headers.set("Authorization", "Bearer " + anonKey);

            HttpEntity<byte[]> requestEntity = new HttpEntity<>(letra.getBytes(StandardCharsets.UTF_8), headers);

            // Usa PUT se for sobrescrever, senão POST
            HttpMethod metodoHttp = (sobrescrever ? HttpMethod.PUT : HttpMethod.POST);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.exchange(uploadUrl, metodoHttp, requestEntity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                // Retorna a URL pública do ficheiro
                String caminhoPublico = supabaseUrl + "/storage/v1/object/" + bucket + "/Recursos/letras/"
                        + nomeFicheiro;
                return ResponseEntity.ok(caminhoPublico);
            } else {
                return ResponseEntity.status(response.getStatusCode())
                        .body("Erro ao enviar letra para o Supabase: " + response.getBody());
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao fazer upload da letra para Supabase.");
        }
    }

    @PostMapping("/imagem/duplicar")
    public ResponseEntity<String> duplicarImagem(@RequestParam("caminhoOriginal") String caminhoOriginal) {
        try {
            // 1. Fazer download da imagem do Supabase
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<byte[]> response = restTemplate.exchange(
                    caminhoOriginal,
                    HttpMethod.GET,
                    null,
                    byte[].class);

            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possível baixar a imagem original.");
            }

            byte[] conteudo = response.getBody();

            // 2. Extrair nome e extensão
            String nomeOriginal = Paths.get(new URI(caminhoOriginal).getPath()).getFileName().toString();

            nomeOriginal = limparNomeArquivo(nomeOriginal);

            String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf('.'));
            String nomeBase = nomeOriginal.substring(0, nomeOriginal.lastIndexOf('.'));
            String novoNome = nomeBase + "_" + UUID.randomUUID() + extensao;

            // 3. Upload no Supabase (API REST Storage)
            String bucket = "ispmedia"; // o bucket que você usa
            String pasta = "Recursos/imagens/";
            String anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kampuaW5peHh4aHhreG9ramhiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDAwMjMxMCwiZXhwIjoyMDY5NTc4MzEwfQ.EtsD_0YQe2baPb-3CHb1fcw_DMU86hKIsOF-U2BBxus";
            String novoCaminho = pasta + novoNome;

            String supabaseUrl = "https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/" + bucket + "/"
                    + novoCaminho;

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + anonKey); // precisa da chave service_role
            headers.set("Content-Type", "application/octet-stream");

            HttpEntity<byte[]> requestEntity = new HttpEntity<>(conteudo, headers);

            ResponseEntity<String> uploadResponse = restTemplate.exchange(
                    supabaseUrl,
                    HttpMethod.POST,
                    requestEntity,
                    String.class);

            if (!uploadResponse.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Erro ao fazer upload no Supabase.");
            }

            // 4. URL pública gerada
            String novaUrl = "https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/" + bucket + "/" + novoCaminho;

            return ResponseEntity.ok(novaUrl);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao duplicar imagem.");
        }
    }

    @PostMapping("/letra/duplicar")
    public ResponseEntity<String> duplicarLetra(@RequestParam("caminhoOriginal") String caminhoOriginal) {
        try {
            // 1. Download da letra a partir da URL
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<byte[]> response = restTemplate.exchange(
                    caminhoOriginal,
                    HttpMethod.GET,
                    null,
                    byte[].class);

            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possível baixar a letra original.");
            }

            byte[] conteudo = response.getBody();

            // 2. Extrair nome e extensão
            String nomeOriginal = Paths.get(new URI(caminhoOriginal).getPath()).getFileName().toString();
            nomeOriginal = limparNomeArquivo(nomeOriginal);
            String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf('.'));
            String baseNome = nomeOriginal.substring(0, nomeOriginal.lastIndexOf('.'));
            String novoNome = baseNome + "_" + UUID.randomUUID() + extensao;

            // 3. Upload no Supabase
            String bucket = "ispmedia"; // teu bucket
            String pasta = "Recursos/letras/";
            String anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kampuaW5peHh4aHhreG9ramhiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDAwMjMxMCwiZXhwIjoyMDY5NTc4MzEwfQ.EtsD_0YQe2baPb-3CHb1fcw_DMU86hKIsOF-U2BBxus";
            String novoCaminho = pasta + novoNome;

            String supabaseUrl = "https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/" + bucket + "/"
                    + novoCaminho;

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + anonKey); // ⚠️ usar service_role_key no backend
            headers.set("Content-Type", "application/octet-stream");

            HttpEntity<byte[]> requestEntity = new HttpEntity<>(conteudo, headers);

            ResponseEntity<String> uploadResponse = restTemplate.exchange(
                    supabaseUrl,
                    HttpMethod.POST,
                    requestEntity,
                    String.class);

            if (!uploadResponse.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Erro ao enviar letra para o Supabase.");
            }

            // 4. URL pública final
            String novaUrl = "https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/" + bucket + "/" + novoCaminho;

            return ResponseEntity.ok(novaUrl);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao duplicar a letra.");
        }
    }

    @DeleteMapping("/imagem/deletar")
    public ResponseEntity<String> deletarImagem(@RequestParam("caminho") String caminho) {
        try {
            String supabaseUrl = "https://ndjjninixxxhxkxokjhb.supabase.co";
            String bucket = "ispmedia";
            String anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kampuaW5peHh4aHhreG9ramhiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDAwMjMxMCwiZXhwIjoyMDY5NTc4MzEwfQ.EtsD_0YQe2baPb-3CHb1fcw_DMU86hKIsOF-U2BBxus";

            RestTemplate restTemplate = new RestTemplate();

            // O caminho que vem do front é algo como:
            // https://ndjjninixxxhxkxokjhb.supabase.co/storage/v1/object/ispmedia/Recursos/imagens/ficheiro.png
            String prefixo = supabaseUrl + "/storage/v1/object/" + bucket + "/";
            String caminhoRelativo = caminho.replace(prefixo, "");

            // URL de exclusão
            String deleteUrl = supabaseUrl + "/storage/v1/object/" + bucket + "/" + caminhoRelativo;

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + anonKey);

            HttpEntity<Void> request = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(deleteUrl, HttpMethod.DELETE, request,
                    String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.ok("Imagem deletada com sucesso!");
            } else {
                return ResponseEntity.status(response.getStatusCode())
                        .body("Erro ao deletar imagem: " + response.getBody());
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao deletar imagem no Supabase.");
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