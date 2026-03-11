import { Module } from '@nestjs/common';
import { InstagramLeadQualifierModule } from './modules/instagram-lead-qualifier/instagram-lead-qualifier.module';
import { OrchestratorModule } from './modules/orchestrator/orchestrator.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [InstagramLeadQualifierModule, OrchestratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
