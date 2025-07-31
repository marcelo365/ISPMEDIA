package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.AlbumArtista;
import ao.isptec.multimedia.repository.AlbumArtistaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlbumArtistaService {

    @Autowired
    private AlbumArtistaRepository repository;

    public AlbumArtista save(AlbumArtista albumArtista) {
        return repository.save(albumArtista);
    }

    public void delete(AlbumArtista albumArtista) {
        repository.delete(albumArtista);
    }

    public List<AlbumArtista> getAllAlbunsArtistas() {
        return repository.findAll();
    }

    public List<AlbumArtista> findByArtistaId(Integer idArtista) {
        return repository.findByArtistaId(idArtista);
    }

    public List<AlbumArtista> findByAlbumId(Integer idAlbum) {
        return repository.findByAlbumId(idAlbum);
    }

    public AlbumArtista findById(Integer id) {
        return repository.findById(id).orElse(null);
    }

}
