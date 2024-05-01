import mongoose from "mongoose";
import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Query } from "@nestjs/common";
import { User } from "../Schema/User.Schema";
import { UserService } from "../uses-case/User";
import { FolderService } from "src/uses-case/Folder/folder.service";
import { CreatUserDto } from "../uses-case/User/DTO/CreatUser.dto";
import { CreateFolderDto } from "../uses-case/Folder/DTO/CreateFolder.dto";
import { UpdateFolderDto } from "../uses-case/Folder/DTO/UpdateFolder.dto";
import { Public } from "src/Custom Decorators/public.decorator";

@Controller('folder')
export class FolderController {
  constructor(private folderService: FolderService) {}


  @Public()
  @Post("addfolder/:parenid?")
  creatuser(@Body() folder: CreateFolderDto,
            @Param('parenid') parenid: string,
            ) {
    return this.folderService.AddFolder(folder,parenid);
  }

  @Public()
  @Delete('deletefolder/:id')
  async DeleteFolder(@Param('id') id: string) {
    const deletefolder= await this.folderService.deleteFolder(id);
    return deletefolder;
  }


  @Public()
  @Delete('deleteAllfolder')
  async DeleteallFolders(@Body() ids: string[]) {
    return this.folderService.deleteSelectedFolder(ids);
  }

  
@Public()
@Get('getAllby')
async getAllby(
@Query('parentId') parentId?: string,
@Query('name') name?: string,
@Query('createdBy') createdBy?: string,
@Query('sortupdated') sortupdated?:string,
@Query('createdDate') createdDate?: Date,
@Query('lastUpdate') lastUpdate?: Date,
@Query('page') page: number = 1,
@Query('limit') limit: number = 10
) {
return await this.folderService.getAllby(parentId, name, createdBy, createdDate,sortupdated, lastUpdate, page, limit);
}

  @Public()
  @Get('allfolder')
  GetAllFolder() {
    return this.folderService.FindAllFolder();
  }
  @Public()
@Get('onefolder/:folderid')
  GetOneFolder(@Param('folderid') userid: string) {
    return this.folderService.findOneFolder(userid);
  }


  @Public()
  @Patch('/update/:idfolder')
  async UpdateFolder(
    @Body() updatefolderdto: UpdateFolderDto,
    @Param('idfolder') id: string,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updtefolder = await this.folderService.UpdateFolder(id,updatefolderdto);
    if (!updtefolder) throw new HttpException('user not found', 404);
    return updtefolder;
  }


  @Public()
@Get("yourfolder/:userid")
  FindFolderByUser(@Param('userid') userid: string) {
    return this.folderService.FindFolderByUser(userid);
  }


  @Public()
  @Get("parentfolder/:parenid")
  FindFolderByParent(@Param('parenid') parenid: string) {
    return this.folderService.FindFolderByParent(parenid);
  }



  @Public()
  @Delete('deleteselctedfolder/:id')
  async deleteSelcetedFolder(@Param('id') id: string) {
    const idArray=id.split(",")
    return this.folderService.deleteSelectedFolder(idArray);

  }
}
