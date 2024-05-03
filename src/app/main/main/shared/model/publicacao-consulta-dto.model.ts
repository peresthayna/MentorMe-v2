import { PublicacaoTagConsultaDTO } from "src/app/main/shared/model/publicacao-tag-consulta-dto.model";
import { UsuarioConsultaDTO } from "src/app/main/main/usuarios/shared/model/usuario-consulta.dto.model";
import { RespostaConsultaDTO } from "../../detalhes-publicacao/respostas/shared/model/resposta-consulta-dto.model";

export class PublicacaoConsultaDTO {
  id: number;
  usuario: UsuarioConsultaDTO;
  titulo: string;
  publicacao: string;
  dataInicio: Date;
  dataFim?: Date;
  visualizacoes: number;
  publicacaoTags: PublicacaoTagConsultaDTO[] = [];
  quantoTempoFoiPostado: string;
  respostas: RespostaConsultaDTO[] = [];
}
