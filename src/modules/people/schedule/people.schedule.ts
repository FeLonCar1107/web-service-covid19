import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PeopleService } from '../services/people.service';

@Injectable()
export class PeopleSchedule {
  constructor(private readonly peopleService: PeopleService) {}

  @Cron('0 */10 * * * *')
  async handleCron() {
    const data = await this.peopleService.getAllPeople();
    // Save into Data Base
  }
}
