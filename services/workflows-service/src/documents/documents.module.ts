import { Module } from '@nestjs/common';
import { DocumentsController } from '@/documents/documents.controller';
import { DocumentsService } from '@/documents/documents.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { UiDefinitionModule } from '@/ui-definition/ui-definition.module';
import { WorkflowModule } from '@/workflow/workflow.module';

@Module({
  controllers: [DocumentsController],
  imports: [PrismaModule, UiDefinitionModule, WorkflowModule],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
