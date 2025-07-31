package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Grupo;
import ao.isptec.multimedia.service.GrupoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Grupo")
public class GrupoController {

    @Autowired
    private GrupoService grupoService;

    @PostMapping("/save")
    public Grupo saveGrupo(@RequestBody Grupo grupo) {
        return grupoService.save(grupo);
    }

    @DeleteMapping("/delete")
    public void deleteGrupo(@RequestBody Grupo grupo) {
        grupoService.delete(grupo);
    }

    @GetMapping("/getAll")
    public List<Grupo> getAllGrupos() {
        return grupoService.getAllGrupos();
    }

    @GetMapping("/getGruposByNomeContendo")
    public List<Grupo> getGruposByNomeContendo(@RequestParam String nome) {
        return grupoService.findByNomeContainingIgnoreCase(nome);
    }

    @GetMapping("/getGruposByUtilizadorId")
    public List<Grupo> getGruposByUtilizadorId(@RequestParam Integer idUtilizador) {
        return grupoService.findByUtilizadorId(idUtilizador);
    }

    @GetMapping("/getGrupoById")
    public Grupo getGrupoById(@RequestParam Integer id) {
        return grupoService.findById(id);
    }

}
