package ao.isptec.multimedia.service;

import ao.isptec.multimedia.dto.GrupoMembrosGrupo;
import ao.isptec.multimedia.model.Grupo;
import ao.isptec.multimedia.model.MembroGrupo;
import ao.isptec.multimedia.repository.GrupoRepository;
import ao.isptec.multimedia.repository.MembroGrupoRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GrupoService {

    @Autowired
    private GrupoRepository repository;

    @Autowired
    private MembroGrupoService membroGrupoService;

    public Grupo save(Grupo grupo) {
        return repository.save(grupo);
    }

    @Transactional
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

    public List<GrupoMembrosGrupo> pegarMembrosDeCadaGrupoDoSistema() {

        List<Grupo> gruposSistema = getAllGrupos();
        List<GrupoMembrosGrupo> grupoMembrosGrupo = new ArrayList<GrupoMembrosGrupo>();

        for (Grupo grupo : gruposSistema) {
            grupoMembrosGrupo.add(new GrupoMembrosGrupo(grupo, membroGrupoService.findByGrupoId(grupo.getId())));
        }

        return grupoMembrosGrupo;
    }

}
