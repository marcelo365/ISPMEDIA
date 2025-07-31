package ao.isptec.multimedia.model;

import jakarta.persistence.*;

@Entity
public class PrivilegioEditor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idConcedente", nullable = false)
    private Utilizador concedente;

    @ManyToOne
    @JoinColumn(name = "idBeneficiario", nullable = false)
    private Utilizador beneficiario;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Utilizador getConcedente() {
        return concedente;
    }

    public void setConcedente(Utilizador concedente) {
        this.concedente = concedente;
    }

    public Utilizador getBeneficiario() {
        return beneficiario;
    }

    public void setBeneficiario(Utilizador beneficiario) {
        this.beneficiario = beneficiario;
    }

}
