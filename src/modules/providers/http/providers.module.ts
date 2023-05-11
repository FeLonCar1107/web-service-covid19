import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpCustomService } from './http/http.service';

@Module({
  imports: [HttpModule],
  providers: [HttpCustomService],
  exports: [HttpModule, HttpCustomService],
})
export class ProvidersModule {}
