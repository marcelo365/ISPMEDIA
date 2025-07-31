package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Notificacao;
import ao.isptec.multimedia.model.Utilizador;
import ao.isptec.multimedia.service.NotificacaoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Notificacao")
public class NotificacaoController {

    @Autowired
    private NotificacaoService service;

    @PostMapping("/getNotificacoesNaoLidas")
    public List<Notificacao> buscarNaoLidas(@RequestBody Utilizador utilizador) {
        return service.buscarNaoLidas(utilizador);
    }

    @PostMapping("/marcarNotificacoesComoLidas")
    public void marcarComoLidas(@RequestBody List<Notificacao> notificacoes) {
        service.marcarComoLidas(notificacoes);
    }

    @PostMapping("/criarNotificacao")
    public void criarNotificacao(@RequestParam String mensagem, @RequestBody Utilizador utilizador) {
        service.criarNotificacao(mensagem, utilizador);
    }

}
