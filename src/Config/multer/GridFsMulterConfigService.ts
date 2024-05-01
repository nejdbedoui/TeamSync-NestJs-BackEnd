import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage'; // Correct import for GridFsStorage
import { DATA_BASE_CONFIGURATION } from '../Mongo/Index';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
    public gridFsStorage: any;

    constructor() {
        this.gridFsStorage = new GridFsStorage({
            url: DATA_BASE_CONFIGURATION.mongoConnectionString,
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    const filename = file.originalname.trim();
                    const fileInfo = {
                        filename: filename
                    };
                    resolve(fileInfo);
                });
            }
        });
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: this.gridFsStorage
        };
    }
}
