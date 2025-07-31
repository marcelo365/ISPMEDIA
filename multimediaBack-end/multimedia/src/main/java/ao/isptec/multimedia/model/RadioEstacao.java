package ao.isptec.multimedia.model;

import jakarta.persistence.*;

@Entity
public class RadioEstacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String urlStream;
    private String pais;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getUrlStream() {
        return urlStream;
    }

    public void setUrlStream(String urlStream) {
        this.urlStream = urlStream;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }
}
