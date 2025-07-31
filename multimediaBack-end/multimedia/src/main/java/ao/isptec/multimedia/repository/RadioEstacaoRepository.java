package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.RadioEstacao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RadioEstacaoRepository extends JpaRepository<RadioEstacao, Integer> {
    List<RadioEstacao> findByNomeContainingIgnoreCase(String nome);

    Optional<RadioEstacao> findById(Integer id);
}
