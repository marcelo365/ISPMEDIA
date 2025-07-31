package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Video;
import ao.isptec.multimedia.service.VideoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Video")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @PostMapping("/save")
    public Video saveVideo(@RequestBody Video video) {
        return videoService.save(video);
    }

    @DeleteMapping("/delete")
    public void deleteVideo(@RequestBody Video video) {
        videoService.delete(video);
    }

    @GetMapping("/getAll")
    public List<Video> getAllVideos() {
        return videoService.getAllVideos();
    }

    @GetMapping("/getVideosByTituloContendo")
    public List<Video> getVideosByTituloContendo(@RequestParam String titulo) {
        return videoService.findByTituloContainingIgnoreCase(titulo);
    }

    @GetMapping("/getVideosByCategoriaId")
    public List<Video> getVideosByCategoriaId(@RequestParam Integer idCategoria) {
        return videoService.findByCategoriaId(idCategoria);
    }

    @GetMapping("/getVideosByMusicaId")
    public List<Video> getVideosByMusicaId(@RequestParam Integer idMusica) {
        return videoService.findByMusicaId(idMusica);
    }

    @GetMapping("/getVideoById")
    public Video getVideoById(@RequestParam Integer id) {
        return videoService.findById(id);
    }

}
