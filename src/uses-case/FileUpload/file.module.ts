import { Module } from '@nestjs/common';

import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from 'src/Config/multer/GridFsMulterConfigService';
import { FileService } from './file.service';
import { FileController } from 'src/Controllers/file.controller';

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: GridFsMulterConfigService,
        }),
    ],
    controllers: [FileController],
    providers: [GridFsMulterConfigService, FileService],
})
export class FilesModule {}