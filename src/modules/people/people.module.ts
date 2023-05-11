import { Module } from '@nestjs/common';
import { UuidModule } from './../../config/uuid.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PeopleController } from './controllers/people.controller';
import { PeopleService } from './services/people.service';
import { Person } from './entities/person.entity';
import { ProvidersModule } from './../providers/http/providers.module';
import { PeopleSchedule } from './schedule/people.schedule';
import { HttpCustomService } from '../providers/http/http/http.service';
@Module({
  imports: [UuidModule, TypeOrmModule.forFeature([Person]), ProvidersModule],
  controllers: [PeopleController],
  providers: [PeopleService, PeopleSchedule, HttpCustomService],
})
export class PeopleModule {}
