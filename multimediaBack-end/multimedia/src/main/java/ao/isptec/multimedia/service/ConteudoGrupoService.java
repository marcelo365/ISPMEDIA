package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.ConteudoGrupo;
import ao.isptec.multimedia.repository.ConteudoGrupoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConteudoGrupoService {

    @Autowired
    private ConteudoGrupoRepository repository;

    public ConteudoGrupo save(ConteudoGrupo conteudoGrupo) {
        return repository.save(conteudoGrupo);
    }

    public void delete(ConteudoGrupo conteudoGrupo) {
        repository.delete(conteudoGrupo);
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
}
