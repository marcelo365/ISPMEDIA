package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.AlbumArtista;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumArtistaRepository extends JpaRepository<AlbumArtista, Integer> {
    List<AlbumArtista> findByArtistaId(Integer idArtista);
    List<AlbumArtista> findByAlbumId(Integer idAlbum);
    Optional<AlbumArtista> findById(Integer id);
}
