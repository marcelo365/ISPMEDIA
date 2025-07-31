package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.Album;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumRepository extends JpaRepository<Album, Integer> {
    List<Album> findByTituloContainingIgnoreCase(String titulo);

    Optional<Album> findById(Integer id);

    List<Album> findByUtilizadorId(Integer idUtilizador);
}
