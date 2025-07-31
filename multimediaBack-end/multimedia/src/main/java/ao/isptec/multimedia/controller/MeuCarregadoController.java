package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.MeuCarregado;
import ao.isptec.multimedia.service.MeuCarregadoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/MeuCarregado")
public class MeuCarregadoController {

    @Autowired
    private MeuCarregadoService meuCarregadoService;

    @PostMapping("/save")
    public MeuCarregado saveMeuCarregado(@RequestBody MeuCarregado meuCarregado) {
        return meuCarregadoService.save(meuCarregado);
    }

    @DeleteMapping("/delete")
    public void deleteMeuCarregado(@RequestBody MeuCarregado meuCarregado) {
        meuCarregadoService.delete(meuCarregado);
    }

    @GetMapping("/getAll")
    public List<MeuCarregado> getAllMeusCarregados() {
        return meuCarregadoService.getAllMeusCarregados();
    }

    @GetMapping("/getMeusCarregadosByUtilizadorId")
    public List<MeuCarregado> getMeusCarregadosByUtilizadorId(@RequestParam Integer idUtilizador) {
        return meuCarregadoService.findByUtilizadorId(idUtilizador);
    }

    @GetMapping("/getMeusCarregadosByMusicaId")
    public List<MeuCarregado> getMeusCarregadosByMusicaId(@RequestParam Integer idMusica) {
        return meuCarregadoService.findByMusicaId(idMusica);
    }

    @GetMapping("/getMeusCarregadosByVideoId")
    public List<MeuCarregado> getMeusCarregadosByVideoId(@RequestParam Integer idVideo) {
        return meuCarregadoService.findByVideoId(idVideo);
    }

    @GetMapping("/getMeusCarregadosByVinculoDireto")
    public List<MeuCarregado> getMeusCarregadosByVinculoDireto(@RequestParam Boolean vinculoDireto) {
        return meuCarregadoService.findByVinculoDireto(vinculoDireto);
    }

    @GetMapping("/getMeuCarregadoById")
    public MeuCarregado getMeuCarregadoById(@RequestParam Integer id) {
        return meuCarregadoService.findById(id);
    }
}
