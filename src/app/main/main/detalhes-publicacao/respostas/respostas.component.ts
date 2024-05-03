import { Component, Input, OnInit } from '@angular/core';
import { UsuarioConsultaDTO } from '../../usuarios/shared/model/usuario-consulta.dto.model';
import { UsuarioService } from '../../usuarios/shared/service/usuario.service';
import { RespostaConsultaDTO } from './shared/model/resposta-consulta-dto.model';
import { RespostaService } from './shared/service/resposta.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-respostas',
  templateUrl: './respostas.component.html',
  styleUrls: ['./respostas.component.css']
})
export class RespostasComponent implements OnInit {

  @Input() public respostas: RespostaConsultaDTO[] = [];
  @Input() public isUsuarioLogado: boolean = false;
  public hoverIndex: number = -1;
  public respostaIndex: number = -1;
  public estrelasSelecionadas: number = 0;
  public naoAcionar: boolean = false;
  public mostrarConfirmacao: boolean = false;

  constructor(private respostaService: RespostaService) { }

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
