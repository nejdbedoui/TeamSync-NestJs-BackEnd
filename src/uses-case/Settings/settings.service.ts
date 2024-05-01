import { Injectable } from '@nestjs/common';
import { SettingsRepository } from './Settings-repo/settings.repository';

@Injectable()
export class SettingsService {

  constructor(private settingsRepository: SettingsRepository) {}


  findOneSetting(id: string) {
    return this.settingsRepository.findById(id);
  }
}
