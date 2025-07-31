package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.Categoria;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
    Categoria findByNome(String nome);

    List<Categoria> findByNomeContainingIgnoreCase(String nome);

    Optional<Categoria> findById(Integer id);

    List<Categoria> findByTipo(Integer tipo);
}
