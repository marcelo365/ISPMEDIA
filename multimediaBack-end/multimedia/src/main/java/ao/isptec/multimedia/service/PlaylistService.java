package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Playlist;
import ao.isptec.multimedia.repository.PlaylistRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaylistService {
    @Autowired
    private PlaylistRepository repository;

    public Playlist save(Playlist playlist) {
        return repository.save(playlist);
    }

    public void delete(Playlist playlist) {
        repository.delete(playlist);
    }

    public List<Playlist> getAllPlaylists() {
        return repository.findAll();
    }

    public List<Playlist> findByTituloContainingIgnoreCase(String titulo) {
        return repository.findByTituloContainingIgnoreCase(titulo);
    }

    public List<Playlist> findByUtilizadorId(Integer idUtilizador) {
        return repository.findByUtilizadorId(idUtilizador);
    }

    public List<Playlist> findByPrivada(Boolean privada) {
        return repository.findByPrivada(privada);
    }

    public Playlist findById(Integer id) {
        return repository.findById(id).orElse(null);
    }
}
