package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Playlist;
import ao.isptec.multimedia.service.PlaylistService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Playlist")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @PostMapping("/save")
    public Playlist savePlaylist(@RequestBody Playlist playlist) {
        return playlistService.save(playlist);
    }

    @DeleteMapping("/delete")
    public void deletePlaylist(@RequestBody Playlist playlist) {
        playlistService.delete(playlist);
    }

    @GetMapping("/getAll")
    public List<Playlist> getAllPlaylists() {
        return playlistService.getAllPlaylists();
    }

    @GetMapping("/getPlaylistsByTituloContendo")
    public List<Playlist> getPlaylistsByTituloContendo(@RequestParam String titulo) {
        return playlistService.findByTituloContainingIgnoreCase(titulo);
    }

    @GetMapping("/getPlaylistsByUtilizadorId")
    public List<Playlist> getPlaylistsByUtilizadorId(@RequestParam Integer idUtilizador) {
        return playlistService.findByUtilizadorId(idUtilizador);
    }

    @GetMapping("/getPlaylistsByPrivada")
    public List<Playlist> getPlaylistsByPrivada(@RequestParam Boolean privada) {
        return playlistService.findByPrivada(privada);
    }

    @GetMapping("/getPlaylistById")
    public Playlist getPlaylistById(@RequestParam Integer id) {
        return playlistService.findById(id);
    }
}
