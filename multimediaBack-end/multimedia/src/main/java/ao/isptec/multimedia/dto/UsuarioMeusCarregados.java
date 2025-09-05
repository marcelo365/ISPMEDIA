package ao.isptec.multimedia.dto;

import ao.isptec.multimedia.model.Utilizador;

import java.util.List;

import ao.isptec.multimedia.model.MeuCarregado;

public class UsuarioMeusCarregados {

    private Utilizador utilizador;
    private List<MeuCarregado> meusCarregados;

    public UsuarioMeusCarregados(Utilizador utilizador, List<MeuCarregado> meusCarregados) {
        this.utilizador = utilizador;
        this.meusCarregados = meusCarregados;
    }

    public Utilizador getUtilizador() {
        return utilizador;
    }

    public void setUtilizador(Utilizador utilizador) {
        this.utilizador = utilizador;
    }

    public List<MeuCarregado> getMeusCarregados() {
        return meusCarregados;
    }

    public void setMeusCarregados(List<MeuCarregado> meusCarregados) {
        this.meusCarregados = meusCarregados;
    }

}
