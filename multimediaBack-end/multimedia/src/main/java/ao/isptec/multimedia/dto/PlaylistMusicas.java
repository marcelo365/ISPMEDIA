package ao.isptec.multimedia.dto;

import java.util.List;

import ao.isptec.multimedia.model.Grupo;
import ao.isptec.multimedia.model.MembroGrupo;
import ao.isptec.multimedia.model.Musica;
import ao.isptec.multimedia.model.Playlist;
import ao.isptec.multimedia.model.PlaylistMusica;

public class PlaylistMusicas {

    private Playlist playlist;
    private List<PlaylistMusica> musicas;

    public PlaylistMusicas(Playlist playlist, List<PlaylistMusica> musicas) {
        this.playlist = playlist;
        this.musicas = musicas;
    }

    public Playlist getPlaylist() {
        return playlist;
    }

    public void setPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }

    public List<PlaylistMusica> getMusicas() {
        return musicas;
    }

    public void setMusicas(List<PlaylistMusica> musicas) {
        this.musicas = musicas;
    }

}
