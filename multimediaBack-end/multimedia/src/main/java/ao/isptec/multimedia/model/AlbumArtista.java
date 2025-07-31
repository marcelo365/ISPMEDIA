package ao.isptec.multimedia.model;

import jakarta.persistence.*;

@Entity

public class AlbumArtista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idAlbum", nullable = false)
    private Album album;

    @ManyToOne
    @JoinColumn(name = "idArtista", nullable = false)
    private Artista artista;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public Artista getArtista() {
        return artista;
    }

    public void setArtista(Artista artista) {
        this.artista = artista;
    }


}
