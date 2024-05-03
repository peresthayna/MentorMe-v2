import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioConsultaDTO } from 'src/app/main/main/usuarios/shared/model/usuario-consulta.dto.model';
import { UsuarioCadastroDTO } from 'src/app/main/main/usuarios/shared/model/usuario-cadastro-dto.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly URL: string = 'http://127.0.0.1:8080/auth/login';
  public  static realizouLoginEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  public logar(usuario: UsuarioConsultaDTO): Observable<any> {
    return this.http.post<any>(this.URL, usuario).pipe(
      tap((resposta) => {
        console.log(resposta)
        localStorage.setItem('token', btoa(JSON.stringify(resposta['token'])));
        localStorage.setItem('usuario', btoa(JSON.stringify(resposta['usuario'])));
        LoginService.realizouLoginEvent.emit();
        this.router.navigate(['']);
      }));
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get obterUsuarioLogado(): UsuarioConsultaDTO {
    return localStorage.getItem('usuario')
      ? JSON.parse(atob(localStorage.getItem('usuario')!))
      : null;
  }

  get obterIdUsuarioLogado(): number | null {
    return localStorage.getItem('usuario')
      ? (JSON.parse(atob(localStorage.getItem('usuario')!)) as UsuarioConsultaDTO).id
      : null;
  }

  get obterTokenUsuario(): string {
    return localStorage.getItem('token')
      ? JSON.parse(atob(localStorage.getItem('token')!))
      : null;
  }

  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  public convertCadastrotoConsultaDTO(usuarioCadastro: UsuarioCadastroDTO): UsuarioConsultaDTO {
    const usuario: UsuarioConsultaDTO = new UsuarioConsultaDTO();
    usuario.email = usuarioCadastro.email;
    usuario.senha = usuarioCadastro.senha;
    return usuario;
  }


}
