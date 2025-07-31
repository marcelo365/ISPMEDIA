package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Musica;
import ao.isptec.multimedia.service.MusicaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Musica")
public class MusicaController {

    @Autowired
    private MusicaService musicaService;

    @PostMapping("/save")
    public Musica saveMusica(@RequestBody Musica musica) {
        return musicaService.save(musica);
    }

    @DeleteMapping("/delete")
    public void deleteMusica(@RequestBody Musica musica) {
        musicaService.delete(musica);
    }

    @GetMapping("/getAll")
    public List<Musica> getAllMusicas() {
        return musicaService.getAllMusicas();
    }

    @GetMapping("/getMusicasByTituloContendo")
    public List<Musica> getMusicasByTituloContendo(@RequestParam String titulo) {
        return musicaService.findByTituloContainingIgnoreCase(titulo);
    }

    @GetMapping("/getMusicasByAlbumId")
    public List<Musica> getMusicasByAlbumId(@RequestParam Integer idAlbum) {
        return musicaService.findByAlbumId(idAlbum);
    }

    @GetMapping("/getMusicasByCategoriaId")
    public List<Musica> getMusicasByCategoriaId(@RequestParam Integer idCategoria) {
        return musicaService.findByCategoriaId(idCategoria);
    }

    @GetMapping("/getMusicaById")
    public Musica getMusicaById(@RequestParam Integer id) {
        return musicaService.findById(id);
    }

}
