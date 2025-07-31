package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.PrivilegioEditor;
import ao.isptec.multimedia.repository.PrivilegioEditorRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrivilegioEditorService {

    @Autowired
    private PrivilegioEditorRepository repository;

    public PrivilegioEditor save(PrivilegioEditor privilegioEditor) {
        return repository.save(privilegioEditor);
    }

    public void delete(PrivilegioEditor privilegioEditor) {
        repository.delete(privilegioEditor);
    }

    public List<PrivilegioEditor> getAllPrivilegiosEditores() {
        return repository.findAll();
    }

    public PrivilegioEditor findById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public List<PrivilegioEditor> findByConcedenteId(Integer idConcedente) {
        return repository.findByConcedenteId(idConcedente);
    }

    public List<PrivilegioEditor> findByBeneficiarioId(Integer idBeneficiario) {
        return repository.findByBeneficiarioId(idBeneficiario);
    }

    @Transactional
    public void deleteByConcedenteIdAndBeneficiarioId(Integer concedenteId, Integer beneficiarioId) {
        repository.deleteByConcedenteIdAndBeneficiarioId(concedenteId, beneficiarioId);
    }

}
