import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { FazerPerguntaComponent } from './main/main/fazer-pergunta/fazer-pergunta.component';
import { LoginComponent } from './main/main/usuarios/login/login.component';
import { CadastroComponent } from './main/main/usuarios/cadastro/cadastro.component';
import { UsuarioNaoAutenticadoGuard } from './main/shared/guards/usuario-nao-autenticado.guard';
import { UsuarioAutenticadoGuard } from './main/shared/guards/usuario-autenticado.guard';
import { DetalhesPublicacaoComponent } from './main/main/detalhes-publicacao/detalhes-publicacao.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent, canActivate: [UsuarioNaoAutenticadoGuard] },
  { path: 'cadastro', component: CadastroComponent, canActivate: [UsuarioNaoAutenticadoGuard] },
  { path: 'fazer-pergunta', component: FazerPerguntaComponent, canActivate: [UsuarioAutenticadoGuard] },
  { path: 'detalhes-pergunta/:id', component: DetalhesPublicacaoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
