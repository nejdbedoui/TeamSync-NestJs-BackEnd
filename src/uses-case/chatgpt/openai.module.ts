import { Module } from '@nestjs/common';
import { OpenaiController } from 'src/Controllers/openai.controller';
import { OpenaiService } from './openai.service';
import { MulterModule } from '@nestjs/platform-express';
import { FileModule } from './file/file.module';
import { FileUtil } from './file/file.util';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [FileModule],
      useFactory: (fileUtil: FileUtil) => ({
        fileFilter: fileUtil.imageFileFilter,
        storage: diskStorage({
          destination: 'upload',
          filename: fileUtil.editFileName,
        }),
      }),
      inject: [FileUtil],
    }),
  ],
  controllers: [OpenaiController],
  providers: [OpenaiService],
})

export class OpenaiModule { }
