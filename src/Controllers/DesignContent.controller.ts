import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { Public } from "src/Custom Decorators/public.decorator";
import { DesignContent } from "src/Schema/DesignContent";
import { DesignContentService } from "src/uses-case/DesignContent/designContent.services";

@Controller('DesignContent')
export class DesignContentController {


constructor( private designContentService:DesignContentService){}

@Public()
@Post()
createDesignContent(@Body() designContent: DesignContent) {
  return this.designContentService.addDesignContent(designContent);
}

@Public()
@Put('uodate')
updateDesignContent( @Body() designContent: DesignContent) {
  return this.designContentService.UpdateDesignContent(designContent);
}

@Public()
@Delete('/:id')
deleteDesignContent(@Param('id') id: string) {
  return this.designContentService.deleteDesignContent(id);
}


@Public()
@Get('all')
getDesignContents() {
  return this.designContentService.getAll();
}

@Public()
@Get('/:id')
getDesignContent(@Param('id') id: string) {
  return this.designContentService.getDesignContentById(id);
}



@Public()
  @Delete('deleteAllcontent')
  async deleteAllDesignContents(@Body() ids: string[]) {
    return this.designContentService.DelteallDesignContents(ids);
  }

}
