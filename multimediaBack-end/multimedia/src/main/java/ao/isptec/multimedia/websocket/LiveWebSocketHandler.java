package ao.isptec.multimedia.websocket;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

@Component
public class LiveWebSocketHandler extends BinaryWebSocketHandler {

    private Process ffmpegProcess;
    private OutputStream ffmpegInput;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String outputDir = "C:\\Users\\Marcelo Rocha\\Desktop\\Multimédia\\Recursos\\lives";
        Path outputPath = Paths.get(outputDir);
        Files.createDirectories(outputPath);

        Path playlistFile = outputPath.resolve("playlist.m3u8");
        String segmentPattern = outputPath.resolve("segment-%03d.ts").toString();

        ProcessBuilder pb = new ProcessBuilder(
                "ffmpeg",
                "-fflags", "+genpts",
                "-f", "webm", // entrada WebM (via WebSocket)
                "-i", "pipe:0", // STDIN
                "-c:v", "libx264", // codificação de vídeo
                "-preset", "ultrafast",
                "-tune", "zerolatency",
                "-g", "30", // GOP = 1 segundo
                "-sc_threshold", "0",
                "-c:a", "aac", // codificação de áudio
                "-f", "hls",
                "-hls_time", "2", // duração dos segmentos
                "-hls_list_size", "6", // número máximo de segmentos no m3u8
                "-hls_flags", "delete_segments+append_list",
                "-hls_segment_filename", segmentPattern,
                playlistFile.toString());

        pb.redirectErrorStream(true);
        ffmpegProcess = pb.start();
        ffmpegInput = ffmpegProcess.getOutputStream();

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

        System.out.println("✅ FFmpeg iniciado com sucesso via WebSocket.");
    }

    @Override
    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) throws IOException {
        System.out.println("📦 Recebido blob via WebSocket: " + message.getPayloadLength() + " bytes");
        ffmpegInput.write(message.getPayload().array());
        ffmpegInput.flush();
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("🛑 WebSocket desconectado");
        if (ffmpegInput != null)
            ffmpegInput.close();
        if (ffmpegProcess != null)
            ffmpegProcess.destroy();
    }

}
