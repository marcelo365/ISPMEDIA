package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Utilizador;
import ao.isptec.multimedia.repository.UtilizadorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtilizadorService {

    @Autowired
    private UtilizadorRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Utilizador save(Utilizador utilizador) {
        // Criptografar a senha antes de salvar
        String senhaCriptografada = passwordEncoder.encode(utilizador.getSenha());
        utilizador.setSenha(senhaCriptografada);
        return repository.save(utilizador);
    }

    public List<Utilizador> getAllUtilizadores() {
        return (List<Utilizador>) repository.findAll();
    }

    public void delete(Utilizador utilizador) {
        repository.delete(utilizador);
    }

    public Utilizador findByUserName(String username) {
        return repository.findByUsername(username);
    }

    public Utilizador findByEmail(String email) {
        return repository.findByEmail(email);
    }

    public Utilizador findByUserNameAndSenha(String username, String senha) {
        Utilizador utilizador = repository.findByUsername(username);
        if (utilizador != null && passwordEncoder.matches(senha, utilizador.getSenha())) {
            return utilizador;
        }
        return null;
    }

    public Utilizador findById(Integer id) {
        return repository.findById(id).orElse(null);
    }

}
