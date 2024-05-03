import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvaliacaoConsultaDTO } from '../model/avaliacao-consulta.dto';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  private readonly URL: string = 'http://127.0.0.1:8080/avaliacao';

  constructor(private http: HttpClient) { }

  public getAvaliacoesPorResposta(idResposta: number): Observable<AvaliacaoConsultaDTO> {
    return this.http.get<AvaliacaoConsultaDTO>(this.URL+'/resposta/'+idResposta);
  }

  public getAvaliacaoPorId(id: number): Observable<AvaliacaoConsultaDTO> {
    return this.http.get<AvaliacaoConsultaDTO>(this.URL+'/'+id);
  }

  public cadastrarAvaliacao(avaliacao: AvaliacaoConsultaDTO): Observable<void> {
    return this.http.post<void>(this.URL, avaliacao);
  }

  public atualizarAvaliacao(id: number, avaliacao: AvaliacaoConsultaDTO): Observable<void> {
    return this.http.put<void>(this.URL+'/'+id, avaliacao);
  }

  public deletarAvaliacao(id: number): void {
    this.http.delete<void>(this.URL+'/'+id);
  }

}
