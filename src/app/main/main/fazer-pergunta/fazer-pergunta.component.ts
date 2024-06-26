import { Component, OnInit } from '@angular/core';
import { TagConsultaDTO } from '../tags/shared/model/tag-consulta-dto.model';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PublicacaoService } from '../shared/service/publicacao.service';
import { TagService } from '../tags/shared/service/tag.service';
import { PublicacaoCadastroDTO } from '../shared/model/publicacao-cadastro-dto.model';
import { PublicacaoTagCadastroDTO } from '../../shared/model/publicacao-tag-cadastro-dto.model';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-fazer-pergunta',
  templateUrl: './fazer-pergunta.component.html',
  styleUrls: ['./fazer-pergunta.component.css']
})
export class FazerPerguntaComponent implements OnInit {

  public publicacao: string;
  public titulo: string = '';
  public tag: string;
  public tags: TagConsultaDTO[] = [];
  public tagsBuscadas: TagConsultaDTO[] = [];
  private debounceSubject: Subject<string> = new Subject<string>();
  private debounceSubscription: Subscription;
  public isPublicacaoValid: boolean = false;
  public isAdicionarDisabled: boolean = true;
  public tagsSelecionaveisSeverity: string = 'info';
  public tagsSelecionadasSeverity: string = 'info';
  public tagNaoClicavel: boolean = false;
  public tituloValid: boolean = true;
  public publicacaoValid: boolean = true;

  constructor(
    private router: Router,
    private tagService: TagService,
    private publicacaoService: PublicacaoService
  ) { }

  ngOnInit(): void {
    this.getTags();
    this.debounceSubscription = this.debounceSubject.pipe(
      debounceTime(500)
    ).subscribe(searchTerm => {
      this.tagService.getTagsPorNome(searchTerm).subscribe(t => {
        if(t && t.length > 0) {
          this.isAdicionarDisabled = true;
          this.tagsBuscadas = t;
        } else {
          this.isAdicionarDisabled = false;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.debounceSubscription.unsubscribe();
  }

  public getTags(): void {
    let params: HttpParams = new HttpParams()
      .set('page', 0)
      .set('pageSize', 20)
    this.tagService.getTagsOrdenadasPorData(params).subscribe(t => {
      this.tagsBuscadas = t.items;
    })
  }

  public adicionarTag(t: TagConsultaDTO): void {
    if(this.hideTagJaAdicionada(t)) {
      return;
    }
    if(this.tags.length < 5) {
      this.verificaArrayTagsCores();
      this.tags.push(t);
      this.tag = '';
      this.getTags();
    }
    this.verificaTamanhoArrayTags();
  }

  public adicionarTagNova(): void {
    if(this.tags.length < 5) {
      this.verificaArrayTagsCores();
      this.tags.push(new TagConsultaDTO(this.tag));
      this.tag = '';
      this.isAdicionarDisabled = true;
    }
    this.verificaTamanhoArrayTags();
  }

  public excluirTag(tagEscolhida: TagConsultaDTO): void {
    let index = this.tags.indexOf(tagEscolhida);
    this.tags.splice(index, 1);
    this.verificaTamanhoArrayTags();
    this.verificaArrayTagsCores();
  }

  public onSearchTag(event): void {
    if(this.tag) {
      this.debounceSubject.next(this.tag);
    } else {
      this.getTags();
    }
  }

  public hideTagJaAdicionada(tagSelecionada: TagConsultaDTO): boolean {
    return !!this.tags.find(tag => tag.id === tagSelecionada.id);
  }

  public verificaTamanhoArrayTags(): void {
    if(this.tags.length == 5) {
      this.isAdicionarDisabled = true;
      this.tagsSelecionaveisSeverity = 'danger';
      this.tagsSelecionadasSeverity = 'success';
      this.tagNaoClicavel = true;
    }
  }

  public verificaArrayTagsCores(): void {
    this.tagNaoClicavel = false;
    this.tagsSelecionaveisSeverity = 'info';
    this.tagsSelecionadasSeverity = 'info';
  }

  public adicionarPublicacao(): void {
    this.titulo ? this.tituloValid = true : this.tituloValid = false;
    this.publicacao ? this.publicacaoValid = true : this.publicacaoValid = false;
    if(this.publicacaoValid && this.tituloValid) {
        let publicacaoNova: PublicacaoCadastroDTO= new PublicacaoCadastroDTO();
        publicacaoNova.titulo = this.titulo;
        publicacaoNova.publicacao = this.publicacao;
        let publicacaoTags: PublicacaoTagCadastroDTO[] = [];
        if(this.tags) {
          this.tags.forEach(tag => publicacaoTags.push(new PublicacaoTagCadastroDTO(tag)));
        }
        publicacaoNova.publicacaoTags = publicacaoTags;
        this.publicacaoService.cadastrarPublicacao(publicacaoNova).subscribe(() => {
          this.router.navigate(['']);
        },(httpError: HttpErrorResponse) => {
          alert('Erro ao publicar pergunta.');
      })
    }
  }

  public validateTitulo(): void {
    this.titulo.length > 0 ? this.tituloValid = true : this.tituloValid = false;
  }

  public validatePublicacao(): void {
    this.publicacao.length > 0 ? this.publicacaoValid = true : this.publicacaoValid = false;
  }

}
