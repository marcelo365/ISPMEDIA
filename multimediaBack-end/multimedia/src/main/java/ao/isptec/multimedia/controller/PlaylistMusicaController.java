package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.PlaylistMusica;
import ao.isptec.multimedia.service.PlaylistMusicaService;

import org.springframework.beans.factory.annotation.Autowired;
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
