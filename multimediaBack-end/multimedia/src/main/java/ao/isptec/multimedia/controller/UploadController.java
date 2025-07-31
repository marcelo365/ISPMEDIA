package ao.isptec.multimedia.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
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
            String pastaDestino = "C:\\Users\\Marcelo Rocha\\Desktop\\Multimédia\\Recursos\\imagens\\";
            Files.createDirectories(Paths.get(pastaDestino));

            String nomeFinal;

            if (sobrescrever && caminhoAntigo != null && !caminhoAntigo.isBlank()) {
                // Exemplo de caminhoAntigo: "/files/imagens/nome_imagem.png"
                nomeFinal = Paths.get(caminhoAntigo).getFileName().toString();
            } else {
                String nomeOriginal = file.getOriginalFilename();
                String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf('.'));
                String nomeBase = nomeOriginal.substring(0, nomeOriginal.lastIndexOf('.'));
                nomeFinal = nomeBase + "_" + UUID.randomUUID() + extensao;
            }

            File destino = new File(pastaDestino + nomeFinal);
            file.transferTo(destino);

            String caminhoFoto = "/files/imagens/" + nomeFinal;

            return ResponseEntity.ok(caminhoFoto);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar imagem.");
        }
    }

    @PostMapping("/letra")
    public ResponseEntity<String> uploadLetra(
            @RequestParam("titulo") String tituloMusica,
            @RequestParam("letra") String letra,
            @RequestParam(value = "sobrescrever", defaultValue = "false") boolean sobrescrever,
            @RequestParam(value = "caminhoAntigo", required = false) String caminhoAntigo) {
        String pastaLetra = "C:\\Users\\Marcelo Rocha\\Desktop\\Multimédia\\Recursos\\letras\\";

        try {
            Files.createDirectories(Paths.get(pastaLetra));

            String nomeFicheiro;

            if (sobrescrever && caminhoAntigo != null && !caminhoAntigo.isBlank()) {
                // Exemplo: "/files/letras/NomeDaMusica_123.txt"
                nomeFicheiro = Paths.get(caminhoAntigo).getFileName().toString();
            } else {
                // Gera nome único
                String uuid = UUID.randomUUID().toString();
                String nomeBase = tituloMusica.replaceAll("[^a-zA-Z0-9\\-_]", "_");
                nomeFicheiro = nomeBase + "_" + uuid + ".txt";
            }

            Path caminhoLetra = Paths.get(pastaLetra, nomeFicheiro);

            Files.writeString(caminhoLetra, letra, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);

            String caminhoVirtual = "/files/letras/" + nomeFicheiro;
            return ResponseEntity.ok(caminhoVirtual);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao guardar a letra da música.");
        }
    }

    @PostMapping("/imagem/duplicar")
    public ResponseEntity<String> duplicarImagem(@RequestParam("caminhoOriginal") String caminhoOriginal) {
        try {
            // Caminho base físico
            String pastaBase = "C:\\Users\\Marcelo Rocha\\Desktop\\Multimédia\\Recursos";
            String pastaDestino = pastaBase + "\\imagens\\";

            // Cria diretório se não existir
            Files.createDirectories(Paths.get(pastaDestino));

            // Extrai apenas o nome da imagem do caminho original
            String nomeOriginal = Paths.get(caminhoOriginal).getFileName().toString();

            // Caminho físico do ficheiro original
            Path caminhoFisicoOriginal = Paths.get(pastaDestino, nomeOriginal);
            if (!Files.exists(caminhoFisicoOriginal)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Imagem original não encontrada.");
            }

            // Gera novo nome com UUID
            String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf('.'));
            String nomeBase = nomeOriginal.substring(0, nomeOriginal.lastIndexOf('.'));
            String novoNome = nomeBase + "_" + UUID.randomUUID() + extensao;

            // Caminho da nova imagem
            Path novoCaminho = Paths.get(pastaDestino, novoNome);

            // Copia o arquivo
            Files.copy(caminhoFisicoOriginal, novoCaminho);

            // Retorna caminho virtual
            String novoCaminhoVirtual = "/files/imagens/" + novoNome;
            return ResponseEntity.ok(novoCaminhoVirtual);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao duplicar imagem.");
        }
    }

    @PostMapping("/letra/duplicar")
    public ResponseEntity<String> duplicarLetra(@RequestParam("caminhoOriginal") String caminhoOriginal) {
        String pastaBase = "C:\\Users\\Marcelo Rocha\\Desktop\\Multimédia\\Recursos";
        String caminhoLimpo = caminhoOriginal.replaceFirst("/files", "");
        String caminhoFicheiroOriginal = pastaBase + caminhoLimpo.replace("/", "\\");

        try {
            Path caminhoOriginalPath = Paths.get(caminhoFicheiroOriginal);
            String nomeOriginal = caminhoOriginalPath.getFileName().toString();

            String baseNome = nomeOriginal.substring(0, nomeOriginal.lastIndexOf('.'));
            String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf('.'));
            String novoNome = baseNome + "_" + UUID.randomUUID() + extensao;

            Path pastaDestino = Paths.get(pastaBase + "\\letras\\");
            Files.createDirectories(pastaDestino); // garante que a pasta existe

            Path novoCaminho = pastaDestino.resolve(novoNome);

            // Copia o ficheiro
            Files.copy(caminhoOriginalPath, novoCaminho);

            String caminhoVirtual = "/files/letras/" + novoNome;
            return ResponseEntity.ok(caminhoVirtual);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao duplicar a letra da música.");
        }
    }

}