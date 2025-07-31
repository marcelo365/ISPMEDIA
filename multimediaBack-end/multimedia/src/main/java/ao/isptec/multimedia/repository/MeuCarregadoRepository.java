package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.MeuCarregado;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MeuCarregadoRepository extends JpaRepository<MeuCarregado, Integer> {
    List<MeuCarregado> findByUtilizadorId(Integer idUtilizador);

    List<MeuCarregado> findByMusicaId(Integer idMusica);

    List<MeuCarregado> findByVideoId(Integer idVideo);

    List<MeuCarregado> findByVinculoDireto(Boolean vinculoDireto);

    Optional<MeuCarregado> findById(Integer id);
}
