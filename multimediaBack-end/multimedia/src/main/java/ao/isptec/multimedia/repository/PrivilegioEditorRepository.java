package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.PrivilegioEditor;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivilegioEditorRepository extends JpaRepository<PrivilegioEditor, Integer> {
    List<PrivilegioEditor> findByConcedenteId(Integer idConcedente);

    List<PrivilegioEditor> findByBeneficiarioId(Integer idBeneficiario);

    void deleteByConcedenteIdAndBeneficiarioId(Integer concedenteId, Integer beneficiarioId);

}
