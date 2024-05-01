import { Post, Get, Param, Res, Controller, UseInterceptors, UseGuards, UploadedFiles, HttpException, HttpStatus, UploadedFile } from '@nestjs/common';
import {  FilesInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiConsumes } from '@nestjs/swagger';
import { Public } from 'src/Custom Decorators/public.decorator';
import { FileService } from 'src/uses-case/FileUpload/file.service';

import { FileResponseVm } from 'src/uses-case/FileUpload/model/FileResponseVm ';

@Controller('/attachment/files')
export class FileController {
    constructor(private filesService: FileService){}
    @Public()
    @Post('')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('file'))
    upload(@UploadedFiles() files) {
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                id: file.id,
                filename: file.filename,
                metadata: file.metadata,
                bucketName: file.bucketName,
                chunkSize: file.chunkSize,
                size: file.size,
                md5: file.md5,
                uploadDate: file.uploadDate,
                contentType: file.contentType,
                url:"http://localhost:3001/attachment/files/"+file.id
            };
            response.push(fileReponse);
        });
        return response;
    }

    @Public()
    @Get('info/:id')
    async getFileInfo(@Param('id') id: string): Promise<FileResponseVm> {        
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file info', HttpStatus.EXPECTATION_FAILED)
        }
        return {
            message: 'File has been detected',
            file: file
        }
    }
    @Public()
    @Get(':id')
    async getFile(@Param('id') id: string, @Res() res) {        
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        }
        res.header('Content-Type', file.contentType);
        return filestream.pipe(res)
    }
    @Public()
    @Get('download/:id')
    async downloadFile(@Param('id') id: string, @Res() res) {
        const file = await this.filesService.findInfo(id)        
        const filestream = await this.filesService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        } 
        res.header('Content-Type', file.contentType);
        res.header('Content-Disposition', 'attachment; filename=' + file.filename);
        return filestream.pipe(res) 
    }
    @Public()
    @Get('delete/:id')
    @ApiCreatedResponse({ type: FileResponseVm })
    async deleteFile(@Param('id') id: string): Promise<FileResponseVm> {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.deleteFile(id)
        if(!filestream){
            throw new HttpException('An error occurred during file deletion', HttpStatus.EXPECTATION_FAILED)
        }        
        return {
            message: 'File has been deleted',
            file: file
        }
    }

}
