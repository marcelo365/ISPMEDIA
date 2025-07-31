package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Artista;
import ao.isptec.multimedia.repository.ArtistaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtistaService {

    @Autowired
    private ArtistaRepository repository;

    public Artista save(Artista artista) {
        return repository.save(artista);
    }

    public void delete(Artista artista) {
        repository.delete(artista);
    }

    public List<Artista> getAllArtistas() {
        return repository.findAll();
    }

    public List<Artista> findByNomeContainingIgnoreCase(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    public Artista findById(Integer id) {
        return repository.findById(id).orElse(null);
    }

}
