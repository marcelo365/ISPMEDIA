package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.ConteudoGrupo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ConteudoGrupoRepository extends JpaRepository<ConteudoGrupo, Integer> {
    List<ConteudoGrupo> findByGrupoId(Integer idGrupo);

    List<ConteudoGrupo> findByMusicaId(Integer idMusica);

    List<ConteudoGrupo> findByVideoId(Integer idVideo);

    List<ConteudoGrupo> findByUtilizadorId(Integer idUtilizador);

    Optional<ConteudoGrupo> findById(Integer id);
}
