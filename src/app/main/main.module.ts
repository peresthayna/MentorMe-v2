import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng-lts/menubar';
import { TabViewModule } from 'primeng-lts/tabview';
import { SlideMenuModule } from 'primeng-lts/slidemenu';
import { TooltipModule } from 'primeng-lts/tooltip';
import { FooterComponent } from './footer/footer.component';
import { EditorModule } from 'primeng-lts/editor';
import { TagModule } from 'primeng-lts/tag';
import { PaginatorModule } from 'primeng-lts/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagsComponent } from './main/tags/tags.component';
import { FazerPerguntaComponent } from './main/fazer-pergunta/fazer-pergunta.component';
import { UsuariosComponent } from './main/usuarios/usuarios.component';
import { LoginComponent } from './main/usuarios/login/login.component';
import { CadastroComponent } from './main/usuarios/cadastro/cadastro.component';
import { DetalhesPublicacaoComponent } from './main/detalhes-publicacao/detalhes-publicacao.component';
import { ResponderComponent } from './main/detalhes-publicacao/responder/responder.component';
import { RespostasComponent } from './main/detalhes-publicacao/respostas/respostas.component';
import { AvaliarComponent } from './main/detalhes-publicacao/avaliar/avaliar.component';

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    FooterComponent,
    TagsComponent,
    FazerPerguntaComponent,
    UsuariosComponent,
    LoginComponent,
    CadastroComponent,
    DetalhesPublicacaoComponent,
    ResponderComponent,
    RespostasComponent,
    AvaliarComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    TabViewModule,
    SlideMenuModule,
    TooltipModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    TagModule,
    PaginatorModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class MainModule { }
