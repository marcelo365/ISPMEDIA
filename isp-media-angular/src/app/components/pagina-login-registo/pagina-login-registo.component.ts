import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { UtilizadorService } from '../../services/utilizador.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Utilizador } from '../../models/Utilizador';
import { SharedDataService } from '../../services/shared-data.service';
import { share } from 'rxjs';
import { MembroGrupo } from '../../models/MembroGrupo';
import { GrupoService } from '../../services/grupo.service';
import { Grupo } from '../../models/Grupo';
import { MembroGrupoService } from '../../services/membro-grupo.service';

@Component({
  selector: 'app-pagina-login-registo',
  imports: [FormsModule, CommonModule],
  templateUrl: './pagina-login-registo.component.html',
  styleUrl: './pagina-login-registo.component.scss'
})
export class PaginaLoginRegistoComponent {

  @ViewChild('container') containerRef!: ElementRef;
  utilizadorService = inject(UtilizadorService);
  sharedDataService = inject(SharedDataService);
  grupoService = inject(GrupoService);
  membroGrupoService = inject(MembroGrupoService);
  router = inject(Router);
  toast = inject(ToastrService);

  //registo
  nome: string = "";
  email: string = "";
  username: string = "";
  senha: string = "";
  confirmacaoSenha: string = "";

  grupoPublico!: Grupo;

  //login
  usernameLogin: string = "";
  senhaLogin: string = "";

  ngOnInit() {

    this.grupoService.getGrupoById(1).subscribe(grupo => {
      this.grupoPublico = grupo;
    });
  }

  goLogin() {
    this.containerRef.nativeElement.classList.remove('active');
  }

  goRegister() {
    this.containerRef.nativeElement.classList.add('active');
  }


  efectuarRegisto() {

    if (this.nome == "") {
      this.toast.error('Campo vazio , porfavor digite o nome', 'Erro!', { closeButton: true });
      return;
    } else if (this.email == "") {
      this.toast.error('Campo vazio , porfavor digite o email', 'Erro!', { closeButton: true });
      return;
    } else if (this.username == "") {
      this.toast.error('Campo vazio , porfavor digite o username', 'Erro!', { closeButton: true });
      return;
    } else if (this.senha == "") {
      this.toast.error('Campo vazio , porfavor digite a senha', 'Erro!', { closeButton: true });
      return;
    } else if (this.confirmacaoSenha == "") {
      this.toast.error('Campo vazio , porfavor digite a confirmação senha', 'Erro!', { closeButton: true });
      return;
    } else if (this.senha != this.confirmacaoSenha) {
      this.toast.error('Senha confirmada incorrecta', 'Erro!', { closeButton: true });
      return;
    }

    this.verificarUtilizador();

  }

  verificarUtilizador() {

    this.utilizadorService.getUtilizadorByUserName(this.username).subscribe({
      next: (res) => {
        this.toast.error('Já existe um utilizador com esse username', 'Erro!', { closeButton: true });
      },
      error: (err) => {
        if (err.status === 404) {
          // Usuário ainda não existe
          this.verificarEmail();
        } else {
          this.toast.error('Erro de rede ao verificar usuário a cadastrar', 'Erro!', { closeButton: true });
          console.error('Erro:', err);
        }
      },
      complete: () => {
        console.log('Requisição finalizada com sucesso!');
      }
    });

  }

  verificarEmail() {

    this.utilizadorService.getUtilizadorByEmail(this.email).subscribe({
      next: (res) => {
        this.toast.error('Já existe um utilizador com esse email', 'Erro!', { closeButton: true });
      },
      error: (err) => {
        if (err.status === 404) {
          // Usuário ainda não existe
          this.cadastrarUsuario();
        } else {
          this.toast.error('Erro de rede ao verificar email do usuário a cadastrar', 'Erro!', { closeButton: true });
          console.error('Erro:', err);
        }
      },
      complete: () => {
        console.log('Requisição finalizada com sucesso!');
      }
    });

  }

  cadastrarUsuario() {

    const utilizador = new Utilizador(null, this.nome, this.username, this.senha, this.email, this.getLocalDateTimeForMySQL(), 1, 1);

    console.log(this.getLocalDateTimeForMySQL());

    this.utilizadorService.createUtilizador(utilizador).subscribe({
      next: (res) => {
        this.toast.success('Usuário cadastrado com sucesso', 'Sucesso!', { closeButton: true });

        this.nome = "";
        this.email = "";
        this.username = "";
        this.senha = "";
        this.confirmacaoSenha = "";
        const membroGrupo = new MembroGrupo(null, 1, 1, this.grupoPublico, res);
        this.inserirUsuarioNoGrupoPublico(membroGrupo);
      },
      error: (err) => {
        this.toast.error('Erro de rede no cadastro do usuário', 'Erro!', { closeButton: true });
        console.error('Erro:', err);
      },
      complete: () => {
        console.log('Requisição finalizada com sucesso!');
      }
    });
  }

  inserirUsuarioNoGrupoPublico(membroGrupo: MembroGrupo) {

    this.membroGrupoService.saveMembroGrupo(membroGrupo).subscribe({
      next: (res) => {
        //this.toast.success('Usuário inserido no grupo público com sucesso', 'Sucesso!', { closeButton: true });
      },
      error: (err) => {
        this.toast.error('Erro de rede na inserção do usuário no grupo público', 'Erro!', { closeButton: true });
        console.error('Erro:', err);
      },
      complete: () => {
        console.log('Requisição finalizada com sucesso!');
      }
    });

  }

  fazerLogin() {

    if (this.usernameLogin == "") {
      this.toast.error('Campo vazio , porfavor digite o username', 'Erro!', { closeButton: true });
      return;
    } else if (this.senhaLogin == "") {
      this.toast.error('Campo vazio , porfavor digite a senha', 'Erro!', { closeButton: true });
      return;
    }

    this.utilizadorService.getUtilizadorByUserNameAndSenha(this.usernameLogin, this.senhaLogin).subscribe({
      next: (res) => {
        //this.toast.success('Usuário encontrado', 'Sucesso!', { closeButton: true });
        console.log(res);
        this.sharedDataService.usuarioLogado = res;
        this.usernameLogin = "";
        this.senhaLogin = "";

        if (res.tipo == 1) {
          this.router.navigate(['/pagina-inicial']);
        } else {
          this.toast.success('Usuário encontrado', 'Sucesso!', { closeButton: true });
        }

      },
      error: (err) => {
        if (err.status === 404) {
          // Usuário ainda não existe 
          this.toast.error('Usuário ou senha incorrectos', 'Erro!', { closeButton: true });
        } else {
          this.toast.error('Erro de rede ao verificar usuário normal para login', 'Erro!', { closeButton: true });
          console.error('Erro:', err);
        }
      },
      complete: () => {
        console.log('Requisição finalizada com sucesso!');
      }
    });

  }

  getLocalDateTimeForMySQL(): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }


}
