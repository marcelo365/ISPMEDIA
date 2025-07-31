package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Critica;
import ao.isptec.multimedia.repository.CriticaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CriticaService {

    @Autowired
    private CriticaRepository repository;

    public Critica save(Critica critica) {
        return repository.save(critica);
    }

    public void delete(Critica critica) {
        repository.delete(critica);
    }

    public List<Critica> getAllCriticas() {
        return repository.findAll();
    }

    public List<Critica> findByUtilizadorId(Integer idUtilizador) {
        return repository.findByUtilizadorId(idUtilizador);
    }

    public List<Critica> findByAlbumId(Integer idAlbum) {
        return repository.findByAlbumId(idAlbum);
    }

    public Critica findById(Integer id) {
        return repository.findById(id).orElse(null);
    }
}
