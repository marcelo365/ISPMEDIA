package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.Notificacao;
import ao.isptec.multimedia.model.Utilizador;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {
    List<Notificacao> findByUtilizadorAndLidaFalse(Utilizador utilizador);
}
