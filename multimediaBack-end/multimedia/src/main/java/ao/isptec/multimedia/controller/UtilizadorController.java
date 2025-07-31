package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Utilizador;
import ao.isptec.multimedia.service.UtilizadorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Utilizador")
public class UtilizadorController {

    @Autowired
    private UtilizadorService utilizadorService;

    @GetMapping("/getAll")
    public List<Utilizador> getAllUtilizadores() {
        return utilizadorService.getAllUtilizadores();
    }

    @GetMapping("/getUtilizadorByUsername")
    public ResponseEntity<Utilizador> getUtilizadorByUsername(@RequestParam String username) {
        Utilizador utilizador = utilizadorService.findByUserName(username);
        if (utilizador == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Retorna 404 se não encontrado
        }
        return ResponseEntity.ok(utilizador);
    }

    @GetMapping("/getUtilizadorByEmail")
    public ResponseEntity<Utilizador> getUtilizadorByEmail(@RequestParam String email) {
        Utilizador utilizador = utilizadorService.findByEmail(email);
        if (utilizador == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Retorna 404 se não encontrado
        }
        return ResponseEntity.ok(utilizador);
    }

    @GetMapping("/getUtilizadorByUsernameAndSenha")
    public ResponseEntity<Utilizador> getUtilizadorByUsernameAndSenha(@RequestParam String username,
            @RequestParam String senha) {
        Utilizador utilizador = utilizadorService.findByUserNameAndSenha(username, senha);
        if (utilizador == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Retorna 404 se não encontrado
        }
        return ResponseEntity.ok(utilizador);
    }

    @PostMapping("/save")
    public Utilizador saveUtilizador(@RequestBody Utilizador utilizador) {
        return utilizadorService.save(utilizador);
    }

    @DeleteMapping("/delete")
    public void deleteUtilizador(@RequestBody Utilizador utilizador) {
        utilizadorService.delete(utilizador);
    }

    @GetMapping("/getUtilizadorById")
    public Utilizador getUtilizadorById(@RequestParam Integer id) {
        return utilizadorService.findById(id);
    }

}
