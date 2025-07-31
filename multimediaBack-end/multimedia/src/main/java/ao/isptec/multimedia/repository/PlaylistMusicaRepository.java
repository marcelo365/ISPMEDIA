package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.PlaylistMusica;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistMusicaRepository extends JpaRepository<PlaylistMusica, Integer> {
    List<PlaylistMusica> findByPlaylistId(Integer idPlaylist);

    List<PlaylistMusica> findByMusicaId(Integer idMusica);

    Optional<PlaylistMusica> findById(Integer id);
}
