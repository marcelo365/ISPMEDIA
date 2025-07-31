package ao.isptec.multimedia.controller;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/ficheiros")
public class FicheiroController {

        private final String pastaMusicas = "\\musicas\\";
        private final String pastaVideos = "\\videos\\";

        @PostMapping("/upload")
        public ResponseEntity<String> upload(
                        @RequestParam("file") MultipartFile file,
                        @RequestParam("tipo") String tipo // musica ou video
        ) throws IOException, InterruptedException {

                String destino = tipo.equals("video") ? pastaVideos : pastaMusicas;
                Files.createDirectories(Paths.get(destino)); // garante a pasta

                String pastaBase = "C:\\Users\\Marcelo Rocha\\Desktop\\Multimédia\\Recursos";
                String pastaDestino = pastaBase + destino;

                String nomeOriginal = file.getOriginalFilename();
                String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf('.'));
                String nomeBase = nomeOriginal.substring(0, nomeOriginal.lastIndexOf('.'));
                String nomeUnico = nomeBase + "_" + UUID.randomUUID() + extensao;

                Path caminho = Paths.get(pastaDestino + nomeUnico);

                // 1. Salva o ficheiro
                file.transferTo(caminho);

                // 2. Gera HLS com FFmpeg
                String nomeSemExtensao = nomeUnico.substring(0, nomeUnico.lastIndexOf('.'));
                String caminhoInput = caminho.toString();
                String caminhoOutput = pastaDestino + nomeSemExtensao + ".m3u8";

                List<String> comando;

                if (tipo.equals("video")) {
                        // Comando para vídeo
                        comando = List.of(
                                        "ffmpeg",
                                        "-i", caminhoInput,
                                        "-c:v", "libx264", // compressão com codec H.264
                                        "-crf", "23", // qualidade/compressão (18=alta, 28=alta compressão)
                                        "-preset", "medium", // equilíbrio entre tempo e compressão
                                        "-profile:v", "baseline",
                                        "-level", "3.0",
                                        "-start_number", "0",
                                        "-hls_time", "10",
                                        "-hls_list_size", "0",
                                        "-f", "hls",
                                        caminhoOutput);
                } else {
                        // Comando para áudio
                        comando = List.of(
                                        "ffmpeg",
                                        "-i", caminhoInput,
                                        "-vn",
                                        "-c:a", "aac", // Codec AAC (comprimido, com perdas)
                                        "-b:a", "128k", // Bitrate fixo de 128kbps → nível médio de compressão
                                        "-hls_time", "10",
                                        "-hls_list_size", "0",
                                        "-f", "hls",
                                        caminhoOutput);
                }

                ProcessBuilder pb = new ProcessBuilder(comando);
                pb.redirectErrorStream(true); // junta stderr e stdout
                Process processo = pb.start();

                // (opcional) mostra output do FFmpeg no console
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(processo.getInputStream()))) {
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

                // 3. Caminho virtual para acessar o m3u8
                String caminhoVirtual = tipo.equals("video")
                                ? "/files/videos/" + nomeSemExtensao + ".m3u8"
                                : "/files/musicas/" + nomeSemExtensao + ".m3u8";

                return ResponseEntity.ok(caminhoVirtual);
        }

        @PostMapping("/baixar")
        public ResponseEntity<Resource> baixarFicheiroOriginal(
                        @RequestParam("caminhoM3U8") String caminhoM3U8,
                        @RequestParam("extensaoOriginal") String extensaoOriginal) {

                try {
                        String pastaBase = "C:\\Users\\Marcelo Rocha\\Desktop\\Multimédia\\Recursos";

                        caminhoM3U8 = caminhoM3U8.replaceFirst("/files", "");

                        String caminhoOriginal = caminhoM3U8.replace("/", "\\");

                        // Remove a extensão .m3u8 e adiciona a extensão original
                        String caminhoSemExtensao = caminhoOriginal.substring(0, caminhoOriginal.lastIndexOf('.'));

                        String caminhoComExtensaoOriginal = pastaBase + caminhoSemExtensao + "." + extensaoOriginal;

                        Path path = Paths.get(caminhoComExtensaoOriginal);
                        if (!Files.exists(path)) {
                                return ResponseEntity.notFound().build();
                        }

                        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));

                        return ResponseEntity.ok()
                                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                                        .header(HttpHeaders.CONTENT_DISPOSITION,
                                                        "attachment; filename=\"" + path.getFileName() + "\"")
                                        .body(resource);

                } catch (IOException e) {
                        e.printStackTrace();
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                }
        }

        @PostMapping("/duplicarArquivo")
        public ResponseEntity<String> duplicarArquivo(
                        @RequestParam("caminho") String caminhoRelativo,
                        @RequestParam("tipo") String tipo // "musica" ou "video"
        ) throws IOException, InterruptedException {

                String pastaBase = "C:\\Users\\Marcelo Rocha\\Desktop\\Multimédia\\Recursos";
                // Remove o /files do começo
                String caminhoLimpo = caminhoRelativo.replaceFirst("/files", "");
                String caminhoOriginal = pastaBase + caminhoLimpo.replace("/", "\\");

                File arquivoOriginal = new File(caminhoOriginal);
                if (!arquivoOriginal.exists()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body("Arquivo original não encontrado: " + caminhoOriginal);
                }

                // Extrai nome base, extensão e cria nome único
                String nomeOriginal = arquivoOriginal.getName();
                String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf('.'));
                String nomeBase = nomeOriginal.substring(0, nomeOriginal.lastIndexOf('.'));
                String nomeUnico = nomeBase + "_" + UUID.randomUUID() + extensao;

                String destinoRelativo = tipo.equals("video") ? "\\videos\\" : "\\musicas\\";
                String pastaDestino = pastaBase + destinoRelativo;

                Files.createDirectories(Paths.get(pastaDestino));
                Path caminhoNovo = Paths.get(pastaDestino + nomeUnico);

                // Copia o arquivo original
                Files.copy(arquivoOriginal.toPath(), caminhoNovo, StandardCopyOption.REPLACE_EXISTING);

                // Gera nome .m3u8
                String nomeSemExtensao = nomeUnico.substring(0, nomeUnico.lastIndexOf('.'));
                String caminhoOutput = pastaDestino + nomeSemExtensao + ".m3u8";

                // FFmpeg comando
                List<String> comando;
                if (tipo.equals("video")) {
                        comando = List.of(
                                        "ffmpeg",
                                        "-i", caminhoNovo.toString(),
                                        "-profile:v", "baseline",
                                        "-level", "3.0",
                                        "-start_number", "0",
                                        "-hls_time", "10",
                                        "-hls_list_size", "0",
                                        "-f", "hls",
                                        caminhoOutput);
                } else {
                        comando = List.of(
                                        "ffmpeg",
                                        "-i", caminhoNovo.toString(),
                                        "-vn",
                                        "-c:a", "aac", // COMPRIME com o codec AAC (comum em streaming)
                                        "-b:a", "128k", // COMPRIME com bitrate de 128 kbps (qualidade média)
                                        "-hls_time", "10",
                                        "-hls_list_size", "0",
                                        "-f", "hls",
                                        caminhoOutput);
                }

                // Executa FFmpeg
                ProcessBuilder pb = new ProcessBuilder(comando);
                pb.redirectErrorStream(true);
                Process processo = pb.start();

                try (BufferedReader reader = new BufferedReader(new InputStreamReader(processo.getInputStream()))) {
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

                // Caminho novo
                String caminhoVirtual = tipo.equals("video")
                                ? "/files/videos/" + nomeSemExtensao + ".m3u8"
                                : "/files/musicas/" + nomeSemExtensao + ".m3u8";

                return ResponseEntity.ok(caminhoVirtual);
        }

}
