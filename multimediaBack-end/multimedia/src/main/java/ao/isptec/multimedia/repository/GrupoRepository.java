package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.Grupo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GrupoRepository extends JpaRepository<Grupo, Integer> {
    List<Grupo> findByNomeContainingIgnoreCase(String nome);
    List<Grupo> findByUtilizadorId(Integer idUtilizador);
    Optional<Grupo> findById(Integer id);
}