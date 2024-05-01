import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Redirect} from "@nestjs/common";
import { Public } from "../Custom Decorators/public.decorator";
import { SharedAssetsService } from "../uses-case/Shared-Assets/shared-assets.service";
import { createSharedDto } from "../uses-case/Shared-Assets/DTO/CreateShared.dto";
import { findSharedDto } from "../uses-case/Shared-Assets/DTO/findSharedAssets.dto";

@Controller("SharedAssets")
export class SharedAssetsController {
  constructor(private SharedAssetsService: SharedAssetsService) {
  }


  @Public()
  @Post("create")
  addsharedassets(@Body() sharedassets: createSharedDto
  ) {
    return this.SharedAssetsService.createSharedAssets(sharedassets);
  }


  @Public()
  @Get("find")
  findsharedasseys(@Body() findsharedassets: findSharedDto
  ) {
    return this.SharedAssetsService.findFolderSharedAssets(findsharedassets);
  }




  @Public()
  @Post("findbyuser")
  findSharedAssetsByUser(@Body() Userid:findSharedDto
  ) {
    return this.SharedAssetsService.findSharedAssetsByUser(Userid);
  }



  @Public()
  @Get('getSharedDocAndFoldersBy')
  async getAllDocAndFolderby(
      @Query('Userid') Userid?: string,
      @Query('parentId') parentId?: string,
      @Query('name') name?: string,
      @Query('createdBy') createdBy?: string,
      @Query('sortupdated') sortupdated?:string,
      @Query('createdDate') createdDate?: Date,
      @Query('lastUpdate') lastUpdate?: Date,
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10
  ) {
    return await this.SharedAssetsService.getAllDocAndFolderby(Userid,parentId, name, createdBy,sortupdated, createdDate, lastUpdate, page, limit);
  }









  @Public()
  @Post("findacces")
  getAcceslevelbyUser(
     @Body() findAccesLevler:findSharedDto
  ) {
    return this.SharedAssetsService.getAcceslevelbyUser(findAccesLevler);
  }



}
