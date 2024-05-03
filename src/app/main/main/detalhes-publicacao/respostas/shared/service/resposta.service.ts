import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespostaConsultaDTO } from '../model/resposta-consulta-dto.model';
import { RespostaCadastroDTO } from '../model/resposta-cadastro-dto.model';
import { PageResponseDTO } from 'src/app/main/shared/model/page-response-dto.model';

@Injectable({
  providedIn: 'root'
})
export class RespostaService {

  private readonly URL: string = 'http://127.0.0.1:8080/resposta';

  constructor(private http: HttpClient) { }

  public getRespostasPorPublicacao(params: HttpParams, idPublicacao: number): Observable<PageResponseDTO<RespostaConsultaDTO>> {
    return this.http.get<PageResponseDTO<RespostaConsultaDTO>>(this.URL+'/publicacao/'+idPublicacao,{params});
  }

  public avaliarResposta(idResposta: number, avaliacao: number): Observable<void> {
    return this.http.put<void>(this.URL+'/atualizar-nota/'+idResposta, avaliacao);
  }

  public getRespostaPorId(id: number): Observable<RespostaConsultaDTO> {
    return this.http.get<RespostaConsultaDTO>(this.URL+'/'+id);
  }

  public cadastrarResposta(resposta: RespostaCadastroDTO): Observable<void> {
    return this.http.post<void>(this.URL, resposta);
  }

  public atualizarResposta(id: number, resposta: RespostaCadastroDTO): Observable<void> {
    return this.http.put<void>(this.URL+'/'+id, resposta);
  }

  public deletarResposta(id: number): void {
    this.http.delete<void>(this.URL+'/'+id);
  }
}
