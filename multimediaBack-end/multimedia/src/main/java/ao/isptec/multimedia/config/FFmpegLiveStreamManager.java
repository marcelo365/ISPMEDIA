package ao.isptec.multimedia.config;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.*;
import java.time.Instant;

@Component
public class FFmpegLiveStreamManager {

    private final Path outputDir = Paths.get("C:/Users/Marcelo Rocha/Desktop/Multimédia/Recursos/lives");

    public FFmpegLiveStreamManager() throws IOException {
        Files.createDirectories(outputDir);
    }

    public void enviarBlob(byte[] dados) throws IOException, InterruptedException {
        // Cria arquivo temporário único para evitar conflitos
        String timestamp = String.valueOf(Instant.now().toEpochMilli());
        Path inputFile = outputDir.resolve("temp_input_" + timestamp + ".webm");
        Files.write(inputFile, dados);

        // Define saída de segmentos e playlist
        Path playlistFile = outputDir.resolve("live.m3u8");
        String segmentPattern = outputDir.resolve("segment_%03d.ts").toString();

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

        // Lê saída do FFmpeg para log
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("[FFMPEG] " + line);
            }
        }

        process.waitFor();
        Files.deleteIfExists(inputFile); // remove o temporário
    }
    
}
