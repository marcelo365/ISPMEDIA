package ao.isptec.multimedia.dto;

import java.util.List;

import ao.isptec.multimedia.model.ConteudoGrupo;
import ao.isptec.multimedia.model.Grupo;

public class GrupoConteudosGrupo {

    private Grupo grupo;
    private List<ConteudoGrupo> conteudosGrupo;

    public GrupoConteudosGrupo(Grupo grupo, List<ConteudoGrupo> conteudosGrupo) {
        this.grupo = grupo;
        this.conteudosGrupo = conteudosGrupo;
    }

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }

    public List<ConteudoGrupo> getConteudosGrupo() {
        return conteudosGrupo;
    }

    public void setConteudosGrupo(List<ConteudoGrupo> conteudosGrupo) {
        this.conteudosGrupo = conteudosGrupo;
    }

}
