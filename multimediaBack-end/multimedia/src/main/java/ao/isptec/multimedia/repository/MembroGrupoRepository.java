package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.MembroGrupo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MembroGrupoRepository extends JpaRepository<MembroGrupo, Integer> {
    List<MembroGrupo> findByUtilizadorId(Integer idUtilizador);

    List<MembroGrupo> findByGrupoId(Integer idGrupo);

    List<MembroGrupo> findByPapel(Integer papel);

    List<MembroGrupo> findByEstado(Integer estado);

    Optional<MembroGrupo> findById(Integer id);

    List<MembroGrupo> findByEstadoAndUtilizadorId(Integer estado, Integer utilizadorId);

}
