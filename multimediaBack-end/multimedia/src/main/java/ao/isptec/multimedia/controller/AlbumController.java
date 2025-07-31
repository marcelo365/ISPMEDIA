package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Album;
import ao.isptec.multimedia.service.AlbumService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Album")
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    @PostMapping("/save")
    public Album saveAlbum(@RequestBody Album album) {
        return albumService.save(album);
    }

    @DeleteMapping("/delete")
    public void deleteAlbum(@RequestBody Album album) {
        albumService.delete(album);
    }

    @GetMapping("/getAll")
    public List<Album> getAllAlbuns() {
        return albumService.getAllAlbuns();
    }

    @GetMapping("/getAlbunsByTituloContendo")
    public List<Album> getAlbunsByTituloContendo(@RequestParam String titulo) {
        return albumService.findByTituloContainingIgnoreCase(titulo);
    }

    @GetMapping("/getAlbunsByUtilizadorId")
    public List<Album> getAlbunsByUtilizadorId(@RequestParam Integer idUtilizador) {
        return albumService.findByUtilizadorId(idUtilizador);
    }

    @GetMapping("/getAlbumById")
    public Album getAlbumById(@RequestParam Integer id) {
        return albumService.findById(id);
    }

}
