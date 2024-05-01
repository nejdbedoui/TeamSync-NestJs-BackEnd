import { Injectable} from '@nestjs/common';
import { DesignContentRepository } from './DesignContent-repo/designContent.repository';
import { DesignContent } from 'src/Schema/DesignContent';

@Injectable()
export class DesignContentService {

    constructor(private designContentRepository: DesignContentRepository,
) {
}

addDesignContent(designcontent:DesignContent){
    return this.designContentRepository.create(designcontent);
  }

UpdateDesignContent(designcontent:DesignContent) {
    return this.designContentRepository.update(designcontent.id, designcontent);
  }

  deleteDesignContent(id:string) {
    return this.designContentRepository.delete(id);
}


  async getAll() {
    const designcontents = await this.designContentRepository.findAll();
    return designcontents.sort((a, b) => a.position - b.position);
  }
  

  getDesignContentById(id:string){
    return this.designContentRepository.findById(id);
  }

  DelteallDesignContents(ids: string[]) {
    return Promise.all(ids.map(async (id) => {
      this.designContentRepository.delete(id)}));
  }



}
