package ao.isptec.multimedia.service;

import ao.isptec.multimedia.dto.GrupoConteudosGrupo;
import ao.isptec.multimedia.dto.UsuarioMeusCarregados;
import ao.isptec.multimedia.model.ConteudoGrupo;
import ao.isptec.multimedia.model.Grupo;
import ao.isptec.multimedia.model.Utilizador;
import ao.isptec.multimedia.repository.ConteudoGrupoRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConteudoGrupoService {

    @Autowired
    private ConteudoGrupoRepository repository;

    public ConteudoGrupo save(ConteudoGrupo conteudoGrupo) {
        return repository.save(conteudoGrupo);
    }

    @Transactional
    public void delete(ConteudoGrupo conteudoGrupo) {
        repository.delete(conteudoGrupo);
    }

    @Transactional
    public void deleteByMusicaIdAndGrupoId(Integer musicaId, Integer grupoId) {
        repository.deleteByMusicaIdAndGrupoId(musicaId, grupoId);
    }

    @Transactional
    public void deleteByVideoIdAndGrupoId(Integer videoId, Integer grupoId) {
        repository.deleteByVideoIdAndGrupoId(videoId, grupoId);
    }

    public List<ConteudoGrupo> getAllConteudosGrupos() {
        return repository.findAll();
    }

    public List<ConteudoGrupo> findByGrupoId(Integer idGrupo) {
        return repository.findByGrupoId(idGrupo);
    }

    public List<ConteudoGrupo> findByMusicaId(Integer idMusica) {
        return repository.findByMusicaId(idMusica);
    }

    public List<ConteudoGrupo> findByVideoId(Integer idVideo) {
        return repository.findByVideoId(idVideo);
    }

    public List<ConteudoGrupo> findByUtilizadorId(Integer idUtilizador) {
        return repository.findByUtilizadorId(idUtilizador);
    }

    public ConteudoGrupo findById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public List<GrupoConteudosGrupo> pegarConteudosGrupoDosGrupos(List<Grupo> grupos) {

        List<GrupoConteudosGrupo> gruposConteudosGrupo = new ArrayList<GrupoConteudosGrupo>();

        for (Grupo grupo : grupos) {

            gruposConteudosGrupo.add(new GrupoConteudosGrupo(grupo, findByGrupoId(grupo.getId())));
        }

        return gruposConteudosGrupo;
    }

}
