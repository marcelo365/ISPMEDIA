package ao.isptec.multimedia.dto;

import java.util.List;

import ao.isptec.multimedia.model.Grupo;
import ao.isptec.multimedia.model.MembroGrupo;

public class GrupoMembrosGrupo {

    private Grupo grupo;
    private List<MembroGrupo> membrosGrupo;

    public GrupoMembrosGrupo(Grupo grupo, List<MembroGrupo> membrosGrupo) {
        this.grupo = grupo;
        this.membrosGrupo = membrosGrupo;
    }

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }

    public List<MembroGrupo> getMembrosGrupo() {
        return membrosGrupo;
    }

    public void setMembrosGrupo(List<MembroGrupo> membrosGrupo) {
        this.membrosGrupo = membrosGrupo;
    }

}
