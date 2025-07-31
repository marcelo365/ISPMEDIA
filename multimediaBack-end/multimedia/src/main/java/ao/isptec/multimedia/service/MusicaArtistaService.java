package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.MusicaArtista;
import ao.isptec.multimedia.repository.MusicaArtistaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MusicaArtistaService {

    @Autowired
    private MusicaArtistaRepository repository;

    public MusicaArtista save(MusicaArtista musicaArtista) {
        return repository.save(musicaArtista);
    }

    public void delete(MusicaArtista musicaArtista) {
        repository.delete(musicaArtista);
    }

    public List<MusicaArtista> getAllMusicasArtistas() {
        return repository.findAll();
    }

    public List<MusicaArtista> findByMusicaId(Integer idMusica) {
        return repository.findByMusicaId(idMusica);
    }

    public List<MusicaArtista> findByArtistaId(Integer idArtista) {
        return repository.findByArtistaId(idArtista);
    }

    
    public MusicaArtista findById(Integer id) {
        return repository.findById(id).orElse(null);
    }
}
