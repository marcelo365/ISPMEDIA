package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.PrivilegioEditor;
import ao.isptec.multimedia.service.PrivilegioEditorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/PrivilegioEditor")
public class PrivilegioEditorController {

    @Autowired
    private PrivilegioEditorService service;

    @PostMapping("/save")
    public PrivilegioEditor savePrivilegioEditor(@RequestBody PrivilegioEditor privilegioEditor) {
        return service.save(privilegioEditor);
    }

    @DeleteMapping("/delete")
    public void deletePrivilegioEditor(@RequestBody PrivilegioEditor privilegioEditor) {
        service.delete(privilegioEditor);
    }

    @DeleteMapping("/deleteByConcedenteAndBeneficiario")
    public void deleteByConcedenteAndBeneficiario(@RequestParam Integer concedenteId, @RequestParam Integer beneficiarioId) {
        service.deleteByConcedenteIdAndBeneficiarioId(concedenteId, beneficiarioId);
    }

    @GetMapping("/getAll")
    public List<PrivilegioEditor> getAllPrivilegiosEditores() {
        return service.getAllPrivilegiosEditores();
    }

    @GetMapping("/getPrivilegioEditorById")
    public PrivilegioEditor getPrivilegioEditorById(@RequestParam Integer id) {
        return service.findById(id);
    }

    @GetMapping("/getPrivilegiosEditoresByConcedenteId")
    public List<PrivilegioEditor> getPrivilegiosEditoresByConcedenteId(@RequestParam Integer idConcedente) {
        return service.findByConcedenteId(idConcedente);
    }

    @GetMapping("/getPrivilegiosEditoresByBeneficiarioId")
    public List<PrivilegioEditor> getPrivilegiosEditoresByBeneficiarioId(@RequestParam Integer idBeneficiario) {
        return service.findByBeneficiarioId(idBeneficiario);
    }
}
