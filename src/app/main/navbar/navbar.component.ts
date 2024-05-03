import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng-lts/api';
import { LoginService } from '../main/usuarios/login/shared/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public items: MenuItem[];
  public menu: MenuItem[];
  public itemSelecionado: MenuItem;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.verificarUsuarioLogado();
    LoginService.realizouLoginEvent.subscribe(() => this.verificarUsuarioLogado());
    this.menu = [{label: 'Home', command: () => {this.router.navigate([''])}},
    {label: 'Tags', command: () => {this.router.navigate([''])}},
    {label: 'Usuários', command: () => {this.router.navigate([''])}}];
  }

  public home(): void {
    this.router.navigate(['']);
  }

  public verificarUsuarioLogado(): void {
    if(this.loginService.logado) {
      this.items = [{label: 'Perfil', command: () => {this.router.navigate([''])}},
      {label: 'Sair', command: () => {this.loginService.deslogar(); this.verificarUsuarioLogado()}}];
    } else {
      this.items = [{label: 'Entrar', command: () => {this.router.navigate(['/login'])}},
      {label: 'Cadastrar', command: () => {this.router.navigate(['cadastro'])}}];
    }
  }

}
