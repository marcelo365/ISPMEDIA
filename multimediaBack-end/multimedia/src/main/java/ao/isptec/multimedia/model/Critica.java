package ao.isptec.multimedia.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Critica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer pontuacao;

    @Lob
    @Column(columnDefinition = "LONGTEXT", nullable = true)
    private String comentario;

    private LocalDateTime dataCritica;

    @ManyToOne
    @JoinColumn(name = "idUtilizador", nullable = false)
    private Utilizador utilizador;

    @ManyToOne
    @JoinColumn(name = "idAlbum", nullable = false)
    private Album album;

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

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public Integer getPontuacao() {
        return pontuacao;
    }

    public void setPontuacao(Integer pontuacao) {
        this.pontuacao = pontuacao;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public LocalDateTime getDataCritica() {
        return dataCritica;
    }

    public void setDataCritica(LocalDateTime dataCritica) {
        this.dataCritica = dataCritica;
    }
}
