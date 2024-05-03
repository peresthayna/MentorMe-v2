import { Component, OnInit } from '@angular/core';
import { PublicacaoConsultaDTO } from './shared/model/publicacao-consulta-dto.model';
import { HttpParams } from '@angular/common/http';
import { PublicacaoService } from './shared/service/publicacao.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng-lts/api';
import { LoginService } from './usuarios/login/shared/service/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public publicacoes: PublicacaoConsultaDTO[] = [];
  public total: number = 0;
  public params: HttpParams = new HttpParams();
  public page: number = 0;
  public pageSize: number = 5;
  public hasNextPage: boolean = false;
  public carregandoRequisicao: boolean = false;
  public itemsFilter: MenuItem[] = [];
  public selectedFilter: boolean[] = [true, false, false];

  constructor(
    private publicacaoService: PublicacaoService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPublicacoesOrdenadasPorDataMaisRecente(this.page);
    this.itemsFilter = [{label: 'Recentes', command: () => {
      this.getPublicacoesOrdenadasPorDataMaisRecente(this.page);
      this.selectedFilter = [true, false, false];
    }},{label: 'Antigas', command: () => {
      this.getPublicacoesOrdenadasPorDataMaisAntiga(this.page);
      this.selectedFilter = [false, true, false];
    }},{label: 'Sem resposta', command: () => {
      this.getPublicacoesSemResposta(this.page);
      this.selectedFilter = [false, false, true];
    }}
    ];
  }

  public getPublicacoesOrdenadasPorDataMaisRecente(page: number): void {
    this.carregandoRequisicao = true;
    this.page = page;
    this.params = new HttpParams()
    .set('page', this.page)
    .set('pageSize', this.pageSize)
    .set('ascending', false)
    .set('order', 'dataInicio');
    this.publicacaoService.getPublicacoesOrdenadasPorData(this.params).subscribe(publicacoes => {
      this.publicacoes = publicacoes.items;
      this.hasNextPage = publicacoes.hasNext;
      this.total = publicacoes.totalElements;
      this.carregandoRequisicao = false;
    });
  }

  public getPublicacoesOrdenadasPorDataMaisAntiga(page: number): void {
    this.carregandoRequisicao = true;
    this.page = page;
    this.params = new HttpParams()
    .set('page', this.page)
    .set('pageSize', this.pageSize)
    .set('ascending', true)
    .set('order', 'dataInicio');
    this.publicacaoService.getPublicacoesOrdenadasPorData(this.params).subscribe(publicacoes => {
      this.publicacoes = publicacoes.items;
      this.hasNextPage = publicacoes.hasNext;
      this.total = publicacoes.totalElements;
      this.carregandoRequisicao = false;
    })
  }

  public getPublicacoesSemResposta(page: number): void {
    this.carregandoRequisicao = true;
    this.page = page;
    this.params = new HttpParams()
    .set('page', this.page)
    .set('pageSize', this.pageSize)
    .set('order', 'dataInicio');
    this.publicacaoService.getPublicacoesSemResposta(this.params).subscribe(publicacoes => {
      this.publicacoes = publicacoes.items;
      this.hasNextPage = publicacoes.hasNext;
      this.total = publicacoes.totalElements;
      this.carregandoRequisicao = false;
    })
  }


  public onClickAdicionarPergunta(): void {
    this.router.navigate(['/home/nova-pergunta']);
  }

  public onClickExibirDetalhesPublicacao(publicacaoEscolhida: PublicacaoConsultaDTO): void {
    this.router.navigate(['/home/pergunta/'+publicacaoEscolhida.id]);
  }

  public onSwitchPage(event): void {
    if(this.selectedFilter[1]) {
      this.getPublicacoesOrdenadasPorDataMaisRecente(event.page);
    } else if(this.selectedFilter[2]) {
      this.getPublicacoesOrdenadasPorDataMaisAntiga(event.page);
    } else {
      this.getPublicacoesSemResposta(event.page);
    }
  }

  public fazerPergunta(): void {
    if(this.loginService.logado) {
      this.router.navigate(['/fazer-pergunta']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  public selecionarPublicacao(id: number): void {
    this.router.navigate(['detalhes-pergunta/'+id]);
  }

}
