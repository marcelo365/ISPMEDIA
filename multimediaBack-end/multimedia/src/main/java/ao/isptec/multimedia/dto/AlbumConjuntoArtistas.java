package ao.isptec.multimedia.dto;

import java.util.List;

import ao.isptec.multimedia.model.Album;
import ao.isptec.multimedia.model.AlbumArtista;
import ao.isptec.multimedia.model.Artista;
import ao.isptec.multimedia.model.Musica;
import ao.isptec.multimedia.model.MusicaArtista;

public class AlbumConjuntoArtistas {

    private Album album;
    private List<AlbumArtista> conjuntoArtistas;

    public AlbumConjuntoArtistas(Album album, List<AlbumArtista> conjuntoArtistas) {
        this.album = album;
        this.conjuntoArtistas = conjuntoArtistas;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public List<AlbumArtista> getConjuntoArtistas() {
        return conjuntoArtistas;
    }

    public void setConjuntoArtistas(List<AlbumArtista> conjuntoArtistas) {
        this.conjuntoArtistas = conjuntoArtistas;
    }

}
