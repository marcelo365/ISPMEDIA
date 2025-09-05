package ao.isptec.multimedia.dto;

import java.util.List;

import ao.isptec.multimedia.model.Artista;
import ao.isptec.multimedia.model.Musica;
import ao.isptec.multimedia.model.MusicaArtista;

public class MusicaConjuntoArtistas {

    private Musica musica;
    private List<MusicaArtista> conjuntoArtistas;

    public MusicaConjuntoArtistas(Musica musica, List<MusicaArtista> conjuntoArtistas) {
        this.musica = musica;
        this.conjuntoArtistas = conjuntoArtistas;
    }

    public Musica getMusica() {
        return musica;
    }

    public void setMusica(Musica musica) {
        this.musica = musica;
    }

    public List<MusicaArtista> getConjuntoArtistas() {
        return conjuntoArtistas;
    }

    public void setConjuntoArtistas(List<MusicaArtista> conjuntoArtistas) {
        this.conjuntoArtistas = conjuntoArtistas;
    }

}
