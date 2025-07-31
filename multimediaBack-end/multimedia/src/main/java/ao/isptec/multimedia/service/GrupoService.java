package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Grupo;
import ao.isptec.multimedia.repository.GrupoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GrupoService {

    @Autowired
    private GrupoRepository repository;

    public Grupo save(Grupo grupo) {
        return repository.save(grupo);
    }

    public void delete(Grupo grupo) {
        repository.delete(grupo);
    }

    public List<Grupo> getAllGrupos() {
        return repository.findAll();
    }

    public List<Grupo> findByNomeContainingIgnoreCase(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    public List<Grupo> findByUtilizadorId(Integer idUtilizador) {
        return repository.findByUtilizadorId(idUtilizador);
    }

    
    public Grupo findById(Integer id) {
        return repository.findById(id).orElse(null);
    }
    
}
