package ao.isptec.multimedia.service;

import ao.isptec.multimedia.dto.AlbumConjuntoArtistas;
import ao.isptec.multimedia.dto.GrupoConteudosGrupo;
import ao.isptec.multimedia.model.Album;
import ao.isptec.multimedia.model.AlbumArtista;
import ao.isptec.multimedia.model.Grupo;
import ao.isptec.multimedia.repository.AlbumArtistaRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AlbumArtistaService {

    @Autowired
    private AlbumArtistaRepository repository;

    public AlbumArtista save(AlbumArtista albumArtista) {
        return repository.save(albumArtista);
    }

    @Transactional
    public void delete(AlbumArtista albumArtista) {
        repository.delete(albumArtista);
    }

    @Transactional
    public void deletarPorAlbum(Integer idAlbum) {
        repository.deleteByAlbumId(idAlbum);
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

    public List<AlbumConjuntoArtistas> pegarAlbunsArtistasDosAlbuns(List<Album> albuns) {

        List<AlbumConjuntoArtistas> albunsConjuntoArtistas = new ArrayList<AlbumConjuntoArtistas>();

        for (Album album : albuns) {

            albunsConjuntoArtistas.add(new AlbumConjuntoArtistas(album, findByAlbumId(album.getId())));
        }

        return albunsConjuntoArtistas;
    }

}
