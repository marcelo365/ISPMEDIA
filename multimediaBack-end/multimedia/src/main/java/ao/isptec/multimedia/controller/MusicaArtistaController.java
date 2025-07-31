package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.MusicaArtista;
import ao.isptec.multimedia.service.MusicaArtistaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/MusicaArtista")
public class MusicaArtistaController {

    @Autowired
    private MusicaArtistaService musicaArtistaService;

    @PostMapping("/save")
    public MusicaArtista saveMusicaArtista(@RequestBody MusicaArtista musicaArtista) {
        return musicaArtistaService.save(musicaArtista);
    }

    @DeleteMapping("/delete")
    public void deleteMusicaArtista(@RequestBody MusicaArtista musicaArtista) {
        musicaArtistaService.delete(musicaArtista);
    }

    @GetMapping("/getAll")
    public List<MusicaArtista> getAllMusicasArtistas() {
        return musicaArtistaService.getAllMusicasArtistas();
    }

    @GetMapping("/getMusicasArtistasByMusicaId")
    public List<MusicaArtista> getMusicasArtistasByMusicaId(@RequestParam Integer idMusica) {
        return musicaArtistaService.findByMusicaId(idMusica);
    }

    @GetMapping("/getMusicasArtistasByArtistaId")
    public List<MusicaArtista> getMusicasArtistasByArtistaId(@RequestParam Integer idArtista) {
        return musicaArtistaService.findByArtistaId(idArtista);
    }

    @GetMapping("/getMusicaArtistaById")
    public MusicaArtista getMusicaArtistaById(@RequestParam Integer id) {
        return musicaArtistaService.findById(id);
    }

}
