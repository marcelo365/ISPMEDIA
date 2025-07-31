package ao.isptec.multimedia.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import ao.isptec.multimedia.config.FFmpegLiveStreamManager;

import java.io.*;

@RestController
public class LiveStreamController {

    private final FFmpegLiveStreamManager ffmpegManager;

    public LiveStreamController(FFmpegLiveStreamManager ffmpegManager) {
        this.ffmpegManager = ffmpegManager;
    }

    @PostMapping("/uploadBlobLiveStream")
    public ResponseEntity<String> handleSegment(@RequestParam("segment") MultipartFile file) throws InterruptedException {
        try {
            ffmpegManager.enviarBlob(file.getBytes());
            return ResponseEntity.ok("Segmento enviado com sucesso");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao enviar blob para FFmpeg");
        }
    }
}
