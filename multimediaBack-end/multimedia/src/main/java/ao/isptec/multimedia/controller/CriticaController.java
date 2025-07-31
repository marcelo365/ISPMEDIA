package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Critica;
import ao.isptec.multimedia.service.CriticaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Critica")
public class CriticaController {

    @Autowired
    private CriticaService criticaService;

    @PostMapping("/save")
    public Critica saveCritica(@RequestBody Critica critica) {
        return criticaService.save(critica);
    }

    @DeleteMapping("/delete")
    public void deleteCritica(@RequestBody Critica critica) {
        criticaService.delete(critica);
    }

    @GetMapping("/getAll")
    public List<Critica> getAllCriticas() {
        return criticaService.getAllCriticas();
    }

    @GetMapping("/getCriticasByUtilizadorId")
    public List<Critica> getCriticasByUtilizadorId(@RequestParam Integer idUtilizador) {
        return criticaService.findByUtilizadorId(idUtilizador);
    }

    @GetMapping("/getCriticasByAlbumId")
    public List<Critica> getCriticasByAlbumId(@RequestParam Integer idAlbum) {
        return criticaService.findByAlbumId(idAlbum);
    }

    @GetMapping("/getCriticaById")
    public Critica getCriticaById(@RequestParam Integer id) {
        return criticaService.findById(id);
    }

}
