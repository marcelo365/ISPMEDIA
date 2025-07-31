package ao.isptec.multimedia.model;

import jakarta.persistence.*;

@Entity
public class ConteudoGrupo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idGrupo", nullable = false)
    private Grupo grupo; // id do grupo na qual o conteudo pertence

    @ManyToOne
    @JoinColumn(name = "idVideo") // esse conteudo pode ser uma música ou vídeo
    private Video video;

    @ManyToOne
    @JoinColumn(name = "idMusica") // esse conteudo pode ser uma música ou vídeo
    private Musica musica;

    @ManyToOne
    @JoinColumn(name = "idUtilizador", nullable = false)
    private Utilizador utilizador; // utilizador que postou esse contéudo no grupo

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }

    public Video getVideo() {
        return video;
    }

    public void setVideo(Video video) {
        this.video = video;
    }

    public Musica getMusica() {
        return musica;
    }

    public void setMusica(Musica musica) {
        this.musica = musica;
    }

    public Utilizador getUtilizador() {
        return utilizador;
    }

    public void setUtilizador(Utilizador utilizador) {
        this.utilizador = utilizador;
    }

    

}