import { UsuarioService } from './../usuarios/shared/service/usuario.service';
import { Component, Input, OnInit } from '@angular/core';
import { PublicacaoConsultaDTO } from '../shared/model/publicacao-consulta-dto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicacaoService } from '../shared/service/publicacao.service';
import { LoginService } from '../usuarios/login/shared/service/login.service';
import { UsuarioConsultaDTO } from '../usuarios/shared/model/usuario-consulta.dto.model';

@Component({
  selector: 'app-detalhes-publicacao',
  templateUrl: './detalhes-publicacao.component.html',
  styleUrls: ['./detalhes-publicacao.component.css']
})
export class DetalhesPublicacaoComponent implements OnInit {

  public publicacaoSelecionada: PublicacaoConsultaDTO = new PublicacaoConsultaDTO();
  public isUsuarioLogado: boolean = false;

  constructor(private route: ActivatedRoute,
    private publicacaoService: PublicacaoService,
    private loginService: LoginService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getPublicacaoSelecionada();
    if(this.loginService.logado) { this.isUsuarioLogado = true; }
  }

  public getPublicacaoSelecionada(): void {
    this.route.paramMap.subscribe(param => {
      this.publicacaoService.visualizarPublicacao(parseInt(param.get('id')!)).subscribe(publicacao => {
        this.publicacaoSelecionada = publicacao
        this.usuarioService.getUsuarioPorId(publicacao.usuario.id).subscribe(usuario => {
          this.publicacaoSelecionada.usuario = new UsuarioConsultaDTO();
          this.publicacaoSelecionada.usuario = usuario;
        })
      }
      )
    });
  }

}
