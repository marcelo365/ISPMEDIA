package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.RadioEstacao;
import ao.isptec.multimedia.repository.RadioEstacaoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RadioEstacaoService {

    @Autowired
    private RadioEstacaoRepository repository;

    public RadioEstacao save(RadioEstacao radioEstacao) {
        return repository.save(radioEstacao);
    }

    public void delete(RadioEstacao radioEstacao) {
        repository.delete(radioEstacao);
    }

    public List<RadioEstacao> getAllRadioEstacoes() {
        return repository.findAll();
    }

    public List<RadioEstacao> findByNomeContainingIgnoreCase(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    public RadioEstacao findById(Integer id) {
        return repository.findById(id).orElse(null);
    }
}
