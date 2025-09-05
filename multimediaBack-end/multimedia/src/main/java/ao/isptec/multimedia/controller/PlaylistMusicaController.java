package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.PlaylistMusica;
import ao.isptec.multimedia.service.PlaylistMusicaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/PlaylistMusica")
public class PlaylistMusicaController {

    @Autowired
    private PlaylistMusicaService playlistMusicaService;

    @PostMapping("/save")
    public PlaylistMusica savePlaylistMusica(@RequestBody PlaylistMusica playlistMusica) {
        return playlistMusicaService.save(playlistMusica);
    }

    @DeleteMapping("/delete")
    public void deletePlaylistMusica(@RequestBody PlaylistMusica playlistMusica) {
        playlistMusicaService.delete(playlistMusica);
    }

    @DeleteMapping("/{idMusica}")
    public ResponseEntity<Void> deletarPorMusica(@PathVariable Integer idMusica) {
        playlistMusicaService.deletarPorMusica(idMusica);
        return ResponseEntity.noContent().build(); // HTTP 204
    }

    @DeleteMapping("deletarPorPlaylist/{idPlaylist}")
    public ResponseEntity<Void> deletarPorPlaylist(@PathVariable Integer idPlaylist) {
        playlistMusicaService.deletarPorPlaylist(idPlaylist);
        return ResponseEntity.noContent().build(); // HTTP 204
    }

    @DeleteMapping("/delete/musica/{idMusica}/playlist/{idPlaylist}")
    public ResponseEntity<String> deleteByMusicaIdAndPlaylistId(@PathVariable Integer idMusica,
            @PathVariable Integer idPlaylist) {
        playlistMusicaService.deleteByMusicaIdAndPlaylistId(idMusica, idPlaylist);
        return ResponseEntity.ok("Conteúdo deletado com sucesso!");
    }

    @GetMapping("/getAll")
    public List<PlaylistMusica> getAllPlaylistMusicas() {
        return playlistMusicaService.getAllPlaylistMusicas();
    }

    @GetMapping("/getPlaylistMusicasByPlaylistId")
    public List<PlaylistMusica> getPlaylistMusicasByPlaylistId(@RequestParam Integer idPlaylist) {
        return playlistMusicaService.findByPlaylistId(idPlaylist);
    }

    @GetMapping("/getPlaylistMusicasByMusicaId")
    public List<PlaylistMusica> getPlaylistMusicasByMusicaId(@RequestParam Integer idMusica) {
        return playlistMusicaService.findByMusicaId(idMusica);
    }

    @GetMapping("/getPlaylistMusicaById")
    public PlaylistMusica getPlaylistMusicaById(@RequestParam Integer id) {
        return playlistMusicaService.findById(id);
    }
}
