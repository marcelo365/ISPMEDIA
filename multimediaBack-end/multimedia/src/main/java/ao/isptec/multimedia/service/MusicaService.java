package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Musica;
import ao.isptec.multimedia.repository.MusicaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MusicaService {

    @Autowired
    private MusicaRepository repository;

    public Musica save(Musica musica) {
        return repository.save(musica);
    }

    public void delete(Musica musica) {
        repository.delete(musica);
    }

    public List<Musica> getAllMusicas() {
        return repository.findAll();
    }

    public List<Musica> findByTituloContainingIgnoreCase(String titulo) {
        return repository.findByTituloContainingIgnoreCase(titulo);
    }

    public List<Musica> findByAlbumId(Integer idAlbum) {
        return repository.findByAlbumId(idAlbum);
    }

    public List<Musica> findByCategoriaId(Integer idCategoria) {
        return repository.findByCategoriaId(idCategoria);
    }

    public Musica findById(Integer id) {
        return repository.findById(id).orElse(null);
    }
}
