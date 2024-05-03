import { TagConsultaDTO } from "../../main/tags/shared/model/tag-consulta-dto.model";

export class PublicacaoTagCadastroDTO {
  tag: TagConsultaDTO;

  constructor(tag: TagConsultaDTO) {
    this.tag = tag;
  }
}
