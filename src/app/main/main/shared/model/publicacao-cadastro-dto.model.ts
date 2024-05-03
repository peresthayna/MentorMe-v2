import { PublicacaoTagCadastroDTO } from "src/app/main/shared/model/publicacao-tag-cadastro-dto.model";

export class PublicacaoCadastroDTO {
  idUsuario: number;
  titulo: string;
  publicacao: string;
  dataInicio: Date;
  visualizacoes: number;
  publicacaoTags: PublicacaoTagCadastroDTO[] = [];
}
