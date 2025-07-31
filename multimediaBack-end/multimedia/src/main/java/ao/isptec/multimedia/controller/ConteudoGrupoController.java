package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.ConteudoGrupo;
import ao.isptec.multimedia.service.ConteudoGrupoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ConteudoGrupo")
public class ConteudoGrupoController {

    @Autowired
    private ConteudoGrupoService conteudoGrupoService;

    @PostMapping("/save")
    public ConteudoGrupo saveConteudoGrupo(@RequestBody ConteudoGrupo conteudoGrupo) {
        return conteudoGrupoService.save(conteudoGrupo);
    }

    @DeleteMapping("/delete")
    public void deleteConteudoGrupo(@RequestBody ConteudoGrupo conteudoGrupo) {
        conteudoGrupoService.delete(conteudoGrupo);
    }

    @GetMapping("/getAll")
    public List<ConteudoGrupo> getAllConteudosGrupos() {
        return conteudoGrupoService.getAllConteudosGrupos();
    }

    @GetMapping("/getConteudosGruposByGrupoId")
    public List<ConteudoGrupo> getConteudosGruposByGrupoId(@RequestParam Integer idGrupo) {
        return conteudoGrupoService.findByGrupoId(idGrupo);
    }

    @GetMapping("/getConteudosGruposByMusicaId")
    public List<ConteudoGrupo> getConteudosGruposByMusicaId(@RequestParam Integer idMusica) {
        return conteudoGrupoService.findByMusicaId(idMusica);
    }

    @GetMapping("/getConteudosGruposByVideoId")
    public List<ConteudoGrupo> getConteudosGruposByVideoId(@RequestParam Integer idVideo) {
        return conteudoGrupoService.findByVideoId(idVideo);
    }

    @GetMapping("/getConteudosGruposByUtilizadorId")
    public List<ConteudoGrupo> getConteudosGruposByUtilizadorId(@RequestParam Integer idUtilizador) {
        return conteudoGrupoService.findByUtilizadorId(idUtilizador);
    }

    @GetMapping("/getConteudoGrupoById")
    public ConteudoGrupo getConteudoGrupoById(@RequestParam Integer id) {
        return conteudoGrupoService.findById(id);
    }

}
