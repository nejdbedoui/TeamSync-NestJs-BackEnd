import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/Custom Decorators/public.decorator';
import { PromptBodyWithImages, PromptBody } from 'src/uses-case/chatgpt/dto/prompt.dto';
import { OpenaiService } from 'src/uses-case/chatgpt/openai.service';
import { Response } from 'express';

@Controller('openai')
export class OpenaiController {
  constructor(private openaiService: OpenaiService) { }

  @Public()
  @Post("prompt")
  @HttpCode(HttpStatus.OK)
  getPromptResponse(@Body() body: PromptBody) {
    return this.openaiService.getPromptResponse(body.prompt);
  }

  @Public()
  @UseInterceptors(FilesInterceptor("images", 10))
  @HttpCode(HttpStatus.OK)
  @Post("prompt-with-image")
  getPromoptResponseWithImages(@UploadedFiles() images: Array<Express.Multer.File>, @Body() body: PromptBodyWithImages) {
    console.log("images:", images)
    return this.openaiService.getPromoptResponseWithImages(body.prompt, images);
  }

}



