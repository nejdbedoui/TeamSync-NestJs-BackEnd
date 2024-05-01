import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { Public } from 'src/Custom Decorators/public.decorator';
import { Content } from "src/Schema/Content";
import { ContentService } from "src/uses-case/Content/content.service";

@Controller('content')
export class ContentController {


constructor( private contentService:ContentService){}

@Public()
@Post('add')
addContent(@Body() content:Content){
return this.contentService.addContent(content);
}

@Public()
@Patch('update')
modifyContent(@Body() content:Content){
return this.contentService.UpdateContent(content);
}

@Public()
  @Delete('deleteone/:id')
  async deleteContent(@Param('id') id: string) {
    return this.contentService.deleteContent(id);
  }
  @Public()
  @Delete('deleteAllcontent')
  async deleteAlldocs(@Body() ids: string[]) {
    console.log(ids)
    return this.contentService.Delteallcontent(ids);
  }

@Public()
  @Delete('deleteByDoc/:id')
  async deleteContentByDoc(@Param('id') id: string) {
    return this.contentService.deleteContentByDoc(id);
  }


  @Public()
  @Get('getAllContentByDocId/:id')
  async getAllContentByDocId(@Param('id') id: string) {
    return this.contentService.getAllByDoc(id);
  }


  @Public()
  @Get('getContentById/:id')
  async getContentById(@Param('id') id: string) {
    return this.contentService.getcontentById(id);
  }

  @Public()
  @Patch('move/:id/:newPos')
  async moveContent(@Param('id') id: string, @Param('newPos') newPos: number) {
  return this.contentService.decrementRange(id, newPos);
}
}
