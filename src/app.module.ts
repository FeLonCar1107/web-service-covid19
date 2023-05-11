import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from './modules/people/people.module';
import { Person } from './modules/people/entities/person.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || '1234567',
      database: process.env.POSTGRES_DB || 'covid19',
      entities: [Person],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Person]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
