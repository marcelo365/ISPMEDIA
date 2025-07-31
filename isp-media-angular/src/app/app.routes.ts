import { Routes } from '@angular/router';
import { PaginaLoginRegistoComponent } from './components/pagina-login-registo/pagina-login-registo.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';

export const routes: Routes = [
    { path: "", redirectTo: "pagina-login-registo", pathMatch: "full" }, // Redireciona para página inicial
    { path: "pagina-login-registo", component: PaginaLoginRegistoComponent },
    { path: "pagina-inicial", component: PaginaInicialComponent }
];
