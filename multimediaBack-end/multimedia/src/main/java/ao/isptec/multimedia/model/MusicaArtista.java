package ao.isptec.multimedia.model;

import jakarta.persistence.*;

@Entity

public class MusicaArtista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idMusica", nullable = false)
    private Musica musica;

    @ManyToOne
    @JoinColumn(name = "idArtista", nullable = false)
    private Artista artista;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Artista getArtista() {
        return artista;
    }

    public void setArtista(Artista artista) {
        this.artista = artista;
    }

    public Musica getMusica() {
        return musica;
    }

    public void setMusica(Musica musica) {
        this.musica = musica;
    }

}
