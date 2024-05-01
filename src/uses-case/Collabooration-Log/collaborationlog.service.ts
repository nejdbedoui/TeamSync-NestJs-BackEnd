import { Injectable } from '@nestjs/common';
import { CollabLogRepository } from "./Collaboration-Log-Repo/CollabLog.repository";

@Injectable()
export class CollaborationlogService {

  constructor(private CollabLogRepository: CollabLogRepository) {}


}
