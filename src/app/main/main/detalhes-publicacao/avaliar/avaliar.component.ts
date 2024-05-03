import { Component, Input, OnInit } from '@angular/core';
import { AvaliacaoService } from './service/avaliacao.service';
import { RespostaService } from '../respostas/shared/service/resposta.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.component.html',
  styleUrls: ['./avaliar.component.css']
})
export class AvaliarComponent implements OnInit {

  @Input() public idResposta: number;
  public hoverIndex: number = -1;
  public respostaIndex: number = -1;
  public estrelasSelecionadas: number = 0;
  public naoAcionar: boolean = false;
  public mostrarConfirmacao: boolean = false;

  constructor(
    private avaliacaoService: AvaliacaoService,
    private respostaService: RespostaService
  ) { }

  ngOnInit(): void {
  }

  public onHover(index: number, value: number, idResposta: number): void  {
      this.hoverIndex = index;
      this.naoAcionar = false;
      this.respostaIndex = idResposta;
  }

  public onLeave(): void  {
    if(this.naoAcionar) {
      return;
    }
      this.hoverIndex = -1;
      this.respostaIndex = -1;
      this.naoAcionar = false;
      this.mostrarConfirmacao = false;
  }

  public selecionarEstrela(index: number, estrelas: number): void {
    this.hoverIndex = index;
    this.estrelasSelecionadas = estrelas;
    this.naoAcionar = true;
    this.mostrarConfirmacao = true;
  }

  public enviarAvaliacao(idResposta: number, avaliacao: number): void {
    this.respostaService.avaliarResposta(idResposta, (avaliacao+1)).subscribe(() => {
      alert('Resposta avaliada com sucesso!');
      window.location.reload();
    }, (error: HttpErrorResponse) => alert('Falha ao avaliar resposta!'));
  }

}
