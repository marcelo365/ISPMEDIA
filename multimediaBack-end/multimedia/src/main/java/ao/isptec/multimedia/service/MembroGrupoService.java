package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.MembroGrupo;
import ao.isptec.multimedia.repository.MembroGrupoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MembroGrupoService {

    @Autowired
    private MembroGrupoRepository repository;

    public MembroGrupo save(MembroGrupo membroGrupo) {
        return repository.save(membroGrupo);
    }

    public void delete(MembroGrupo membroGrupo) {
        repository.delete(membroGrupo);
    }

    public List<MembroGrupo> getAllMembrosGrupo() {
        return repository.findAll();
    }

    public List<MembroGrupo> findByUtilizadorId(Integer idUtilizador) {
        return repository.findByUtilizadorId(idUtilizador);
    }

    public List<MembroGrupo> findByGrupoId(Integer idGrupo) {
        return repository.findByGrupoId(idGrupo);
    }

    public List<MembroGrupo> findByPapel(Integer papel) {
        return repository.findByPapel(papel);
    }

    public List<MembroGrupo> findByEstado(Integer estado) {
        return repository.findByEstado(estado);
    }

    public List<MembroGrupo> findByEstadoAndUtilizadorId(Integer papel, Integer utilizadorId) {
        return repository.findByEstadoAndUtilizadorId(papel, utilizadorId);
    }

    public MembroGrupo findById(Integer id) {
        return repository.findById(id).orElse(null);
    }

}
