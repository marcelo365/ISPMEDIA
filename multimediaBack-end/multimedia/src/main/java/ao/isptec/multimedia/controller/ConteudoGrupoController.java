package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.dto.GrupoConteudosGrupo;
import ao.isptec.multimedia.model.ConteudoGrupo;
import ao.isptec.multimedia.model.Grupo;
import ao.isptec.multimedia.service.ConteudoGrupoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @DeleteMapping("/delete/musica/{musicaId}/grupo/{grupoId}")
    public ResponseEntity<String> deleteByMusicaIdAndGrupoId(@PathVariable Integer musicaId,
            @PathVariable Integer grupoId) {
        conteudoGrupoService.deleteByMusicaIdAndGrupoId(musicaId, grupoId);
        return ResponseEntity.ok("Conteúdo deletado com sucesso!");
    }

    @DeleteMapping("/delete/video/{videoId}/grupo/{grupoId}")
    public ResponseEntity<String> deleteByVideoIdAndGrupoId(@PathVariable Integer videoId,
            @PathVariable Integer grupoId) {
        conteudoGrupoService.deleteByVideoIdAndGrupoId(videoId, grupoId);
        return ResponseEntity.ok("Conteúdo deletado com sucesso!");
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

    @PostMapping("/pegarConteudosGrupoDosGrupos")
    public List<GrupoConteudosGrupo> pegarConteudosGrupoDosGrupos(@RequestBody List<Grupo> grupos) {
        return conteudoGrupoService.pegarConteudosGrupoDosGrupos(grupos);
    }

}
