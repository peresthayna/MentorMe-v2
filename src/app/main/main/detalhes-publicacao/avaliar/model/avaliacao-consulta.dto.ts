import { UsuarioConsultaDTO } from "../../../usuarios/shared/model/usuario-consulta.dto.model";
import { RespostaConsultaDTO } from "../../respostas/shared/model/resposta-consulta-dto.model";

export class AvaliacaoConsultaDTO {
  public id: number;
  public usuario: UsuarioConsultaDTO;
  public resposta: RespostaConsultaDTO;
  public nota: number;
}
