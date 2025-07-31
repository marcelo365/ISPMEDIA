package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Video;
import ao.isptec.multimedia.repository.VideoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoService {

    @Autowired
    private VideoRepository repository;

    public Video save(Video video) {
        return repository.save(video);
    }

    public void delete(Video video) {
        repository.delete(video);
    }

    public List<Video> getAllVideos() {
        return repository.findAll();
    }

    public List<Video> findByTituloContainingIgnoreCase(String titulo) {
        return repository.findByTituloContainingIgnoreCase(titulo);
    }

    public List<Video> findByCategoriaId(Integer idCategoria) {
        return repository.findByCategoriaId(idCategoria);
    }

    public List<Video> findByMusicaId(Integer idMusica) {
        return repository.findByMusicaId(idMusica);
    }

    public Video findById(Integer id) {
        return repository.findById(id).orElse(null);
    }

}
