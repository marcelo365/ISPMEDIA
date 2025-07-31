package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.Critica;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CriticaRepository extends JpaRepository<Critica, Integer> {
    List<Critica> findByUtilizadorId(Integer idUtilizador);
    List<Critica> findByAlbumId(Integer idAlbum);
     Optional<Critica> findById(Integer id);
}
