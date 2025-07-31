
package ao.isptec.multimedia.config;


import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

@Component
public class LiveFFmpegService {
    private Process ffmpegProcess;
    private OutputStream ffmpegStdin;

    @Value("C:\\Users\\Marcelo Rocha\\Desktop\\Multimédia\\Recursos\\lives")
    private String outputDir;

    @PostConstruct
    public void startFFmpeg() throws IOException {
        Files.createDirectories(Paths.get(outputDir));

        List<String> command = Arrays.asList(
                "ffmpeg",
                "-f", "webm",
                "-i", "pipe:0",
                "-c:v", "libx264",
                "-preset", "ultrafast",
                "-g", "30",
                "-sc_threshold", "0",
                "-hls_time", "2",
                "-hls_list_size", "6",
                "-hls_flags", "delete_segments",
                "-hls_segment_filename", outputDir + "/segment_%03d.ts",
                "-f", "hls",
                outputDir + "/live.m3u8"
        );

        ProcessBuilder pb = new ProcessBuilder(command);
        pb.redirectErrorStream(true);
        ffmpegProcess = pb.start();
        ffmpegStdin = ffmpegProcess.getOutputStream();

        // Log do FFmpeg
        new Thread(() -> {
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(ffmpegProcess.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println("[FFMPEG] " + line);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }).start();
    }

    public void sendToFFmpeg(byte[] data) throws IOException {
        if (ffmpegStdin != null) {
            ffmpegStdin.write(data);
            ffmpegStdin.flush();
        }
    }

    @PreDestroy
    public void stop() throws IOException {
        if (ffmpegStdin != null)
            ffmpegStdin.close();
        if (ffmpegProcess != null)
            ffmpegProcess.destroy();
    }
}
