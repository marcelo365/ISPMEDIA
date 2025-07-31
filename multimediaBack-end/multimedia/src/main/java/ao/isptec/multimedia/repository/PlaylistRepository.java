package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.Playlist;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistRepository extends JpaRepository<Playlist, Integer> {
    List<Playlist> findByTituloContainingIgnoreCase(String titulo);

    List<Playlist> findByUtilizadorId(Integer idUtilizador);

    List<Playlist> findByPrivada(Boolean privada);

    Optional<Playlist> findById(Integer id);
}
