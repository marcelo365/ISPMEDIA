package ao.isptec.multimedia.model;

import jakarta.persistence.*;

@Entity
public class PlaylistMusica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idPlaylist", nullable = false)
    private Playlist playlist;

    @ManyToOne
    @JoinColumn(name = "idMusica", nullable = false)
    private Musica musica;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Playlist getPlaylist() {
        return playlist;
    }

    public void setPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }

    public Musica getMusica() {
        return musica;
    }

    public void setMusica(Musica musica) {
        this.musica = musica;
    }

}
