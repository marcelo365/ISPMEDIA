package ao.isptec.multimedia.model;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
public class Grupo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String descricao;
    private LocalDate dataCriacao;
    private Boolean publico;

    @ManyToOne
    @JoinColumn(name = "idUtilizador")
    private Utilizador utilizador; // utilizador que criou o grupo

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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Utilizador getUtilizador() {
        return utilizador;
    }

    public void setUtilizador(Utilizador utilizador) {
        this.utilizador = utilizador;
    }

    public Boolean getPublico() {
        return publico;
    }

    public void setPublico(Boolean publico) {
        this.publico = publico;
    }

}