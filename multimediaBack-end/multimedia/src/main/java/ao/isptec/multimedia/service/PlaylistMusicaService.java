package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.PlaylistMusica;
import ao.isptec.multimedia.repository.PlaylistMusicaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaylistMusicaService {

    @Autowired
    private PlaylistMusicaRepository repository;

    public PlaylistMusica save(PlaylistMusica playlistMusica) {
        return repository.save(playlistMusica);
    }

    public void delete(PlaylistMusica playlistMusica) {
        repository.delete(playlistMusica);
    }

    public List<PlaylistMusica> getAllPlaylistMusicas() {
        return repository.findAll();
    }

    public List<PlaylistMusica> findByPlaylistId(Integer idPlaylist) {
        return repository.findByPlaylistId(idPlaylist);
    }

    public List<PlaylistMusica> findByMusicaId(Integer idMusica) {
        return repository.findByMusicaId(idMusica);
    }

    
    public PlaylistMusica findById(Integer id) {
        return repository.findById(id).orElse(null);
    }
}
