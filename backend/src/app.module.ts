import { Module } from '@nestjs/common';
import { InstagramLeadQualifierModule } from './modules/instagram-lead-qualifier/instagram-lead-qualifier.module';
import { OrchestratorModule } from './modules/orchestrator/orchestrator.module';
import { ContentCreatorModule } from './modules/content-creator/content-creator.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    InstagramLeadQualifierModule,
    OrchestratorModule,
    ContentCreatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
