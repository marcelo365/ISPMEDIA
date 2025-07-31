package ao.isptec.multimedia.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;

@RestController
public class LiveStreamControllerAntigo {

    @Value("C:\\Users\\Marcelo Rocha\\Desktop\\Multimédia\\Recursos\\lives")
    private String outputDir;

    @PostMapping("/uploadBlobLiveStreasssssm")
    public ResponseEntity<String> handleSegment(@RequestParam("segment") MultipartFile file)
            throws IOException, InterruptedException {

        Path outputPath = Paths.get(outputDir);
        Files.createDirectories(outputPath);

        // Nome temporário de entrada
        Path inputFile = outputPath.resolve("temp_input.webm");
        Files.write(inputFile, file.getBytes());

        // Arquivos de saída (playlist + padrão dos segmentos)
        Path playlistFile = outputPath.resolve("live.m3u8");
        String segmentPattern = outputPath.resolve("segment_%03d.ts").toString(); // sem %03d

        ProcessBuilder pb = new ProcessBuilder(
                "ffmpeg",
                "-i", inputFile.toString(),
                "-c:v", "libx264",
                "-preset", "ultrafast",
                "-g", "30",
                "-sc_threshold", "0",
                "-hls_time", "2",
                "-hls_list_size", "6",
                "-hls_flags", "delete_segments+append_list",
                "-hls_segment_filename", segmentPattern,
                "-f", "hls",
                playlistFile.toString());

        pb.redirectErrorStream(true);
        Process process = pb.start();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            while (reader.readLine() != null) {
                // apenas consome a saída do ffmpeg
            }
        }

        process.waitFor();
        Files.deleteIfExists(inputFile);

        return ResponseEntity.ok("Segmento convertido e adicionado à live.m3u8");
    }
}