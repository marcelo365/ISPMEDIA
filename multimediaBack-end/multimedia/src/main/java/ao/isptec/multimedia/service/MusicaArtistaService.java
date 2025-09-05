package ao.isptec.multimedia.service;

import ao.isptec.multimedia.dto.GrupoConteudosGrupo;
import ao.isptec.multimedia.dto.MusicaConjuntoArtistas;
import ao.isptec.multimedia.model.Grupo;
import ao.isptec.multimedia.model.Musica;
import ao.isptec.multimedia.model.MusicaArtista;
import ao.isptec.multimedia.repository.MusicaArtistaRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MusicaArtistaService {

    @Autowired
    private MusicaArtistaRepository repository;

    public MusicaArtista save(MusicaArtista musicaArtista) {
        return repository.save(musicaArtista);
    }

    @Transactional
    public void delete(MusicaArtista musicaArtista) {
        repository.delete(musicaArtista);
    }

    @Transactional
    public void deletarPorMusica(Integer idMusica) {
        repository.deleteByMusicaId(idMusica);
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

    public List<MusicaConjuntoArtistas> pegarMusicasArtistasDasMusicas(List<Musica> musicas) {

        List<MusicaConjuntoArtistas> musicasConjuntoArtistas = new ArrayList<MusicaConjuntoArtistas>();

        for (Musica musica : musicas) {

            musicasConjuntoArtistas.add(new MusicaConjuntoArtistas(musica, findByMusicaId(musica.getId())));
        }

        return musicasConjuntoArtistas;
    }

}
