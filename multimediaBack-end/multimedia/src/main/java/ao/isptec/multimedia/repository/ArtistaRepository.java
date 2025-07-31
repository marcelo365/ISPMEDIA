package ao.isptec.multimedia.repository;


import ao.isptec.multimedia.model.Artista;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistaRepository extends JpaRepository<Artista, Integer> {
    List<Artista> findByNomeContainingIgnoreCase(String nome);
     Optional<Artista> findById(Integer id);
}
