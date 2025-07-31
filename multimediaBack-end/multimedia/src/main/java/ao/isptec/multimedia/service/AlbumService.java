package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Album;
import ao.isptec.multimedia.repository.AlbumRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlbumService {

    @Autowired
    private AlbumRepository repository;

    public Album save(Album album) {
        return repository.save(album);
    }

    public void delete(Album album) {
        repository.delete(album);
    }

    public List<Album> getAllAlbuns() {
        return repository.findAll();
    }

    public List<Album> findByTituloContainingIgnoreCase(String titulo) {
        return repository.findByTituloContainingIgnoreCase(titulo);
    }

    public List<Album> findByUtilizadorId(Integer idUtilizador) {
        return repository.findByUtilizadorId(idUtilizador);
    }

    public Album findById(Integer id) {
        return repository.findById(id).orElse(null);
    }
}
