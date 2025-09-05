package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.dto.UsuarioMeusCarregados;
import ao.isptec.multimedia.model.MeuCarregado;
import ao.isptec.multimedia.model.Utilizador;
import ao.isptec.multimedia.service.MeuCarregadoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @DeleteMapping("/deletePorMusica/{idMusica}")
    public ResponseEntity<Void> deletarPorMusica(@PathVariable Integer idMusica) {
        meuCarregadoService.deletarPorMusica(idMusica);
        return ResponseEntity.noContent().build(); // HTTP 204
    }

    @DeleteMapping("/deletePorVideo/{idVideo}")
    public ResponseEntity<Void> deletarPorVideo(@PathVariable Integer idVideo) {
        meuCarregadoService.deletarPorVideo(idVideo);
        return ResponseEntity.noContent().build(); // HTTP 204
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

    @PostMapping("/pegarMeusCarregadosDosUsuarios")
    public List<UsuarioMeusCarregados> pegarMeusCarregadosDosUsuarios(@RequestBody List<Utilizador> usuarios) {
        return meuCarregadoService.pegarMeusCarregadosDosUsuarios(usuarios);
    }

}
