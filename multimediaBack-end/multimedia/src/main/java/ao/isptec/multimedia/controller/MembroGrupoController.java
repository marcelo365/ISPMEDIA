package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.MembroGrupo;
import ao.isptec.multimedia.service.MembroGrupoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/MembroGrupo")
public class MembroGrupoController {

    @Autowired
    private MembroGrupoService membroGrupoService;

    @PostMapping("/save")
    public MembroGrupo saveMembroGrupo(@RequestBody MembroGrupo membroGrupo) {
        return membroGrupoService.save(membroGrupo);
    }

    @DeleteMapping("/delete")
    public void deleteMembroGrupo(@RequestBody MembroGrupo membroGrupo) {
        membroGrupoService.delete(membroGrupo);
    }

    @GetMapping("/getAll")
    public List<MembroGrupo> getAllMembrosGrupo() {
        return membroGrupoService.getAllMembrosGrupo();
    }

    @GetMapping("/getMembrosGrupoByUtilizadorId")
    public List<MembroGrupo> getMembrosGrupoByUtilizadorId(@RequestParam Integer idUtilizador) {
        return membroGrupoService.findByUtilizadorId(idUtilizador);
    }

    @GetMapping("/getMembrosGrupoByGrupoId")
    public List<MembroGrupo> getMembrosGrupoByGrupoId(@RequestParam Integer idGrupo) {
        return membroGrupoService.findByGrupoId(idGrupo);
    }

    @GetMapping("/getMembrosGrupoByPapel")
    public List<MembroGrupo> getMembrosGrupoByPapel(@RequestParam Integer papel) {
        return membroGrupoService.findByPapel(papel);
    }

    @GetMapping("/getMembrosGrupoByEstado")
    public List<MembroGrupo> getMembrosGrupoByEstado(@RequestParam Integer estado) {
        return membroGrupoService.findByEstado(estado);
    }

    @GetMapping("/getMembrosGrupoByEstadoAndUtilizadorId")
    public List<MembroGrupo> getMembrosGrupoByEstadoAndUtilizadorId(@RequestParam Integer estado,
            @RequestParam Integer idUtilizador) {
        return membroGrupoService.findByEstadoAndUtilizadorId(estado, idUtilizador);
    }

    @GetMapping("/getMembroGrupoById")
    public MembroGrupo getMembroGrupoById(@RequestParam Integer id) {
        return membroGrupoService.findById(id);
    }

}
