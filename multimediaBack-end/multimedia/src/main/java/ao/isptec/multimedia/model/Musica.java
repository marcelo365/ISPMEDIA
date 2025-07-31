package ao.isptec.multimedia.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Musica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String titulo;
    private LocalTime duracao;
    private String formato;
    private Integer tamanho; // MB
    private String letra;
    private LocalDate dataLancamento;
    private String caminhoFicheiro;
    private String caminhoFoto;

    @ManyToOne
    @JoinColumn(name = "idAlbum")
    private Album album;

    @ManyToOne
    @JoinColumn(name = "idCategoria")
    private Categoria categoria;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public LocalTime getDuracao() {
        return duracao;
    }

    public void setDuracao(LocalTime duracao) {
        this.duracao = duracao;
    }

    public String getFormato() {
        return formato;
    }

    public void setFormato(String formato) {
        this.formato = formato;
    }

    public Integer getTamanho() {
        return tamanho;
    }

    public void setTamanho(Integer tamanho) {
        this.tamanho = tamanho;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public LocalDate getDataLancamento() {
        return dataLancamento;
    }

    public void setDataLancamento(LocalDate dataLancamento) {
        this.dataLancamento = dataLancamento;
    }

    public String getCaminhoFicheiro() {
        return caminhoFicheiro;
    }

    public void setCaminhoFicheiro(String caminhoFicheiro) {
        this.caminhoFicheiro = caminhoFicheiro;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getCaminhoFoto() {
        return caminhoFoto;
    }

    public void setCaminhoFoto(String caminhoFoto) {
        this.caminhoFoto = caminhoFoto;
    }

    public String getLetra() {
        return this.letra;
    }

    public void setLetra(String letra) {
        this.letra = letra;
    }

}
