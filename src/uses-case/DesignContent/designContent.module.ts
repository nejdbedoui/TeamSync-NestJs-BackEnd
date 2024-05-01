import { Module } from '@nestjs/common';
import { DesignContentService } from './designContent.services';
import { DesignContentRepository } from './DesignContent-repo/designContent.repository';
import { DesignContentController } from 'src/Controllers/DesignContent.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DesignContent, DesignContentSchema } from 'src/Schema/DesignContent';

@Module({
  imports:[    MongooseModule.forFeature([{ name: DesignContent.name, schema: DesignContentSchema }]) 
  
  ],
  controllers: [DesignContentController],
  providers: [DesignContentService,
    DesignContentRepository, {

    provide: 'DesignContentRepositoryInterface',
    useClass: DesignContentRepository
  }]
})
export class DesignContentModule {}
