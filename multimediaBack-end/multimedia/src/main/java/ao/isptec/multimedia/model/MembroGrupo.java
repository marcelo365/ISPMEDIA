package ao.isptec.multimedia.model;

import jakarta.persistence.*;

@Entity
public class MembroGrupo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer papel; // 1=membro, 2=editor, 3=owner
    private Integer estado; // 0-recusado , 1-aprovado , 2-pendente

    @ManyToOne
    @JoinColumn(name = "idGrupo", nullable = false)
    private Grupo grupo;

    @ManyToOne
    @JoinColumn(name = "idUtilizador", nullable = false)
    private Utilizador utilizador;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPapel() {
        return papel;
    }

    public void setPapel(Integer papel) {
        this.papel = papel;
    }

    public Integer getEstado() {
        return estado;
    }

    public void setEstado(Integer estado) {
        this.estado = estado;
    }

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }

    public Utilizador getUtilizador() {
        return utilizador;
    }

    public void setUtilizador(Utilizador utilizador) {
        this.utilizador = utilizador;
    }

}