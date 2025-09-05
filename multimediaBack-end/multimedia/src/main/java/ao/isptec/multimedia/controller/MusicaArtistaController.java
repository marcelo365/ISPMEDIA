package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.dto.MusicaConjuntoArtistas;
import ao.isptec.multimedia.model.Musica;
import ao.isptec.multimedia.model.MusicaArtista;
import ao.isptec.multimedia.service.MusicaArtistaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @DeleteMapping("/{idMusica}")
    public ResponseEntity<Void> deletarPorMusica(@PathVariable Integer idMusica) {
        musicaArtistaService.deletarPorMusica(idMusica);
        return ResponseEntity.noContent().build(); // HTTP 204
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

    @PostMapping("/pegarMusicasArtistasDasMusicas")
    public List<MusicaConjuntoArtistas> pegarMusicasArtistasDasMusicas(@RequestBody List<Musica> musicas) {
        return musicaArtistaService.pegarMusicasArtistasDasMusicas(musicas);
    }

}
