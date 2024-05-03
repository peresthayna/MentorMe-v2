import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioCadastroDTO } from 'src/app/main/main/usuarios/shared/model/usuario-cadastro-dto.model';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private readonly URL: string = 'http://127.0.0.1:8080/auth/cadastro';

  constructor(private http: HttpClient) { }

  public cadastrarUsuario(usuario: UsuarioCadastroDTO): Observable<string> {
    return this.http.post<string>(this.URL, usuario);
  }
}
