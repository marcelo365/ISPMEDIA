package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.Video;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Integer> {
    List<Video> findByTituloContainingIgnoreCase(String titulo);

    List<Video> findByCategoriaId(Integer idCategoria);

    List<Video> findByMusicaId(Integer idMusica);

    Optional<Video> findById(Integer id);
}
