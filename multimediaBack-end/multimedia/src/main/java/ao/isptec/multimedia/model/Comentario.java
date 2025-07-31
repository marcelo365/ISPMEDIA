package ao.isptec.multimedia.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String comentario;
    private LocalDateTime dataComentario;

    @ManyToOne
    @JoinColumn(name = "idUtilizador", nullable = false)
    private Utilizador utilizador;

    @ManyToOne
    @JoinColumn(name = "idVideo", nullable = false)
    private Video video;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Utilizador getUtilizador() {
        return utilizador;
    }

    public void setUtilizador(Utilizador utilizador) {
        this.utilizador = utilizador;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public LocalDateTime getDataComentario() {
        return dataComentario;
    }

    public void setDataComentario(LocalDateTime dataComentario) {
        this.dataComentario = dataComentario;
    }

    public Video getVideo() {
        return video;
    }

    public void setVideo(Video video) {
        this.video = video;
    }

}
