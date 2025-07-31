package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.Utilizador;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilizadorRepository extends JpaRepository<Utilizador, Integer> {
    public Utilizador findByUsername(String username);

    public Utilizador findByEmail(String email);

    Optional<Utilizador> findById(Integer id);
}
