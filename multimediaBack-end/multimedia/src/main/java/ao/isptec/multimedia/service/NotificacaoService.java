package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Notificacao;
import ao.isptec.multimedia.model.Utilizador;
import ao.isptec.multimedia.repository.NotificacaoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificacaoService {

    @Autowired
    private NotificacaoRepository repository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void criarNotificacao(String mensagem, Utilizador destinatario) {
        Notificacao n = new Notificacao();
        n.setMensagem(mensagem);
        n.setUtilizador(destinatario);
        n.setLida(false);
        n.setDataCriacao(LocalDateTime.now());
        repository.save(n);

        messagingTemplate.convertAndSend("/topico/notificacao/" + destinatario.getId(), n);
    }

    public List<Notificacao> buscarNaoLidas(Utilizador destinatario) {
        return repository.findByUtilizadorAndLidaFalse(destinatario);
    }

    public void marcarComoLidas(List<Notificacao> notificacoes) {
        for (Notificacao n : notificacoes) {
            n.setLida(true);
        }
        repository.saveAll(notificacoes);
    }
}
