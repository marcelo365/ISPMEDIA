package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Artista;
import ao.isptec.multimedia.service.ArtistaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Artista")
public class ArtistaController {

    @Autowired
    private ArtistaService artistaService;

    @PostMapping("/save")
    public Artista saveArtista(@RequestBody Artista artista) {
        return artistaService.save(artista);
    }

    @DeleteMapping("/delete")
    public void deleteArtista(@RequestBody Artista artista) {
        artistaService.delete(artista);
    }

    @GetMapping("/getAll")
    public List<Artista> getAllArtistas() {
        return artistaService.getAllArtistas();
    }

    @GetMapping("/getArtistasByNomeContendo")
    public List<Artista> getArtistasByNomeContendo(@RequestParam String nome) {
        return artistaService.findByNomeContainingIgnoreCase(nome);
    }

    @GetMapping("/getArtistaById")
    public Artista getArtistaById(@RequestParam Integer id) {
        return artistaService.findById(id);
    }

}
