package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.RadioEstacao;
import ao.isptec.multimedia.service.RadioEstacaoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/RadioEstacao")
public class RadioEstacaoController {

    @Autowired
    private RadioEstacaoService radioEstacaoService;

    @PostMapping("/save")
    public RadioEstacao saveRadioEstacao(@RequestBody RadioEstacao radioEstacao) {
        return radioEstacaoService.save(radioEstacao);
    }

    @DeleteMapping("/delete")
    public void deleteRadioEstacao(@RequestBody RadioEstacao radioEstacao) {
        radioEstacaoService.delete(radioEstacao);
    }

    @GetMapping("/getAll")
    public List<RadioEstacao> getAllRadioEstacoes() {
        return radioEstacaoService.getAllRadioEstacoes();
    }

    @GetMapping("/getRadioEstacoesByNomeContendo")
    public List<RadioEstacao> getRadioEstacoesByNomeContendo(@RequestParam String nome) {
        return radioEstacaoService.findByNomeContainingIgnoreCase(nome);
    }

    @GetMapping("/getRadioEstacaoById")
    public RadioEstacao getRadioEstacaoById(@RequestParam Integer id) {
        return radioEstacaoService.findById(id);
    }

}
