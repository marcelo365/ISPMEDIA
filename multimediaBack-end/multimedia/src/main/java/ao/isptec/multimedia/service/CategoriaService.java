package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Categoria;
import ao.isptec.multimedia.repository.CategoriaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository repository;

    public Categoria save(Categoria categoria) {
        return repository.save(categoria);
    }

    public void delete(Categoria categoria) {
        repository.delete(categoria);
    }

    public List<Categoria> getAllCategorias() {
        return repository.findAll();
    }

    public Categoria findByNome(String nome) {
        return repository.findByNome(nome);
    }

    public List<Categoria> findByTipo(Integer tipo) {
        return repository.findByTipo(tipo);
    }

    public List<Categoria> findByNomeContainingIgnoreCase(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    public Categoria findById(Integer id) {
        return repository.findById(id).orElse(null);
    }
}
