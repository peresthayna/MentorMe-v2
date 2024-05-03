import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RespostaCadastroDTO } from '../respostas/shared/model/resposta-cadastro-dto.model';
import { RespostaService } from '../respostas/shared/service/resposta.service';

@Component({
  selector: 'app-responder',
  templateUrl: './responder.component.html',
  styleUrls: ['./responder.component.css']
})
export class ResponderComponent implements OnInit {

  public resposta: RespostaCadastroDTO = new RespostaCadastroDTO();
  @Input() public idPublicacao: number;

  constructor(private respostaService: RespostaService) { }

  ngOnInit(): void {
  }

  public cadastrarResposta(): void {
    if(this.resposta.resposta != '' && this.resposta.resposta != null) {
      this.resposta.idPublicacao = this.idPublicacao;
      this.respostaService.cadastrarResposta(this.resposta).subscribe(() => {
        alert('Resposta cadastrada com sucesso!');
        window.location.reload();
      }, (error: HttpErrorResponse) => alert('Erro ao cadastrar resposta!'));
    }
  }

}
