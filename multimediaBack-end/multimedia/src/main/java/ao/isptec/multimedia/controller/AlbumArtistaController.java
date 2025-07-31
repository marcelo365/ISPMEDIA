package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.AlbumArtista;
import ao.isptec.multimedia.service.AlbumArtistaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/AlbumArtista")
public class AlbumArtistaController {

    @Autowired
    private AlbumArtistaService albumArtistaService;

    @PostMapping("/save")
    public AlbumArtista saveAlbumArtista(@RequestBody AlbumArtista albumArtista) {
        return albumArtistaService.save(albumArtista);
    }

    @DeleteMapping("/delete")
    public void deleteAlbumArtista(@RequestBody AlbumArtista albumArtista) {
        albumArtistaService.delete(albumArtista);
    }

    @GetMapping("/getAll")
    public List<AlbumArtista> getAllAlbunsArtistas() {
        return albumArtistaService.getAllAlbunsArtistas();
    }

    @GetMapping("/getAlbunsArtistasByArtistaId")
    public List<AlbumArtista> getAlbunsArtistasByArtistaId(@RequestParam Integer idArtista) {
        return albumArtistaService.findByArtistaId(idArtista);
    }

    @GetMapping("/getAlbunsArtistasByAlbumId")
    public List<AlbumArtista> getAlbunsArtistasByAlbumId(@RequestParam Integer idAlbum) {
        return albumArtistaService.findByAlbumId(idAlbum);
    }

    @GetMapping("/getAlbumArtistaById")
    public AlbumArtista getAlbumArtistaById(@RequestParam Integer id) {
        return albumArtistaService.findById(id);
    }

}
