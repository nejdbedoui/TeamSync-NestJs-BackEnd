import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Content } from 'src/Schema/Content';
import { ContentRepository } from './Content-Repo/content.repository';
import { MongoError } from 'typeorm';

@Injectable()
export class ContentService {
  private readonly logger = new Logger(ContentService.name);
  private isProcessing = false; // Flag to track if an update is already in progress

  constructor(
    @InjectModel(Content.name) private ContentModel: Model<Content>,
    private Contentrrepo: ContentRepository
  ) {}

  addContent(content: Content) {
    return this.Contentrrepo.create(content);
  }

  async UpdateContent(content: Content) {
    this.logger.debug('UpdateContent triggered');
    if (!this.isProcessing) {
      this.isProcessing = true;
      try {
        const existingContent = await this.Contentrrepo.findById(content.id);
        if (existingContent) {
          await this.Contentrrepo.update(content.id, content);
        } else {
          content._id = content.id;
          await this.Contentrrepo.incrementAllPos(content.position);
          await this.Contentrrepo.create(content);
        }
        this.isProcessing = false;
      } catch (error) {
        if (error instanceof MongoError && error.code === 11000) {
          await this.Contentrrepo.update(content.id, content);
        } else {
          this.logger.error('Error:', error);
          this.isProcessing = false;
        }
      }
    } else {
     
    }
  }

  deleteContent(id: string) {
    return this.Contentrrepo.delete(id);
  }

  async deleteContentByDoc(id: string) {
    return this.Contentrrepo.deleteManyByDocId(id);
  }

  async getAllByDoc(id: string) {
    const contents = await this.Contentrrepo.find({ documentid: id });
    return contents.sort((a, b) => a.position - b.position);
  }

  getcontentById(id: string) {
    return this.Contentrrepo.findById(id);
  }

  Delteallcontent(ids: string[]) {
    return Promise.all(ids.map(async (id) => {
      this.Contentrrepo.delete(id)
    }));
  }

  async decrementRange(id: string, endPos: number) {
    console.log("yes working")
    const existingContent = await this.Contentrrepo.findById(id);
    if (existingContent.position > endPos) {
      await this.Contentrrepo.decrementRange(endPos, existingContent.position, 1);
    } else {
      await this.Contentrrepo.decrementRange(existingContent.position, endPos, -1);
    }
    existingContent.position = endPos;
    return this.Contentrrepo.update(existingContent.id, existingContent);
  }
}
