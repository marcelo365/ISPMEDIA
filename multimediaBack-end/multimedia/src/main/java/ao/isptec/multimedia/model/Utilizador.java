package ao.isptec.multimedia.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class Utilizador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false) // iiiiiiiiii
    private String nome;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private Integer tipo; // 1=normal , 2==administrador

    private LocalDateTime dataRegisto;

    @Column(nullable = false)
    private Integer ativo; // 1-ativo , 0-desativo

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Integer getTipo() {
        return tipo;
    }

    public void setTipo(Integer tipo) {
        this.tipo = tipo;
    }

    public LocalDateTime getDataRegisto() {
        return dataRegisto;
    }

    public void setDataRegisto(LocalDateTime dataRegisto) {
        this.dataRegisto = dataRegisto;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getAtivo() {
        return ativo;
    }

    public void setAtivo(Integer ativo) {
        this.ativo = ativo;
    }


    
}
