package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.MusicaArtista;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicaArtistaRepository extends JpaRepository<MusicaArtista, Integer> {
    List<MusicaArtista> findByMusicaId(Integer idMusica);

    List<MusicaArtista> findByArtistaId(Integer idArtista);

    Optional<MusicaArtista> findById(Integer id);
}
