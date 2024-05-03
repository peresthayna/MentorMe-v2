import { UsuarioConsultaDTO } from "src/app/main/main/usuarios/shared/model/usuario-consulta.dto.model";

export class RespostaConsultaDTO {
  id: number;
  usuario: UsuarioConsultaDTO;
  resposta: string;
  data: string;
  mediaAvaliacoes: number;
}
