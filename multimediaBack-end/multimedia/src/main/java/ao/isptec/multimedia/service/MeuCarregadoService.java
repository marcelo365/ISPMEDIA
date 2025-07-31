package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.MeuCarregado;
import ao.isptec.multimedia.repository.MeuCarregadoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeuCarregadoService {

    @Autowired
    private MeuCarregadoRepository repository;

    public MeuCarregado save(MeuCarregado meuCarregado) {
        return repository.save(meuCarregado);
    }

    public void delete(MeuCarregado meuCarregado) {
        repository.delete(meuCarregado);
    }

    public List<MeuCarregado> getAllMeusCarregados() {
        return repository.findAll();
    }

    public List<MeuCarregado> findByUtilizadorId(Integer idUtilizador) {
        return repository.findByUtilizadorId(idUtilizador);
    }

    public List<MeuCarregado> findByMusicaId(Integer idMusica) {
        return repository.findByMusicaId(idMusica);
    }

    public List<MeuCarregado> findByVideoId(Integer idVideo) {
        return repository.findByVideoId(idVideo);
    }

    public List<MeuCarregado> findByVinculoDireto(Boolean vinculoDireto) {
        return repository.findByVinculoDireto(vinculoDireto);
    }

    
    public MeuCarregado findById(Integer id) {
        return repository.findById(id).orElse(null);
    }
}
