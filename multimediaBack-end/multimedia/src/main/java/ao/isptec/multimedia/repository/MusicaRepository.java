package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.Musica;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicaRepository extends JpaRepository<Musica, Integer> {
    List<Musica> findByTituloContainingIgnoreCase(String titulo);
    List<Musica> findByAlbumId(Integer idAlbum);
    List<Musica> findByCategoriaId(Integer idCategoria);
    Optional<Musica> findById(Integer id);
}
