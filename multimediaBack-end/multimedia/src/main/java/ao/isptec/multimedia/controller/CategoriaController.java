package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Categoria;
import ao.isptec.multimedia.service.CategoriaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/Categoria")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping("/getAll")
    public List<Categoria> getAllCategorias() {
        return categoriaService.getAllCategorias();
    }

    @GetMapping("/getCategoriaByNome")
    public ResponseEntity<Categoria> getCategoriaByNome(@RequestParam String nome) {
        Categoria categoria = categoriaService.findByNome(nome);
        if (categoria == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(categoria);
    }

    @GetMapping("/getCategoriaByTipo")
    public List<Categoria> getCategoriaByTipo(@RequestParam Integer tipo) {
        return categoriaService.findByTipo(tipo);
    }

    @PostMapping("/save")
    public Categoria saveCategoria(@RequestBody Categoria categoria) {
        return categoriaService.save(categoria);
    }

    @DeleteMapping("/delete")
    public void deleteCategoria(@RequestBody Categoria categoria) {
        categoriaService.delete(categoria);
    }

    @GetMapping("/getCategoriasByNomeContendo")
    public List<Categoria> getCategoriasByNomeContendo(@RequestParam String nome) {
        return categoriaService.findByNomeContainingIgnoreCase(nome);
    }

    @GetMapping("/getCategoriaById")
    public Categoria getCategoriaById(@RequestParam Integer id) {
        return categoriaService.findById(id);
    }

}
