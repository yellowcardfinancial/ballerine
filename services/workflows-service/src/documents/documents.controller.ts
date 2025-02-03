import { Controller, Get, Param } from '@nestjs/common';
import { DocumentsService } from '@/documents/documents.service';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { TProjectId } from '@/types';
import { CurrentProject } from '@/common/decorators/current-project.decorator';
import { DocumentTrackerModel } from './document.model';

@Controller('documents')
@ApiTags('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get('workflow/:workflowId/definition/:definitionId')
  @ApiForbiddenResponse()
  @ApiOkResponse({ type: Array<DocumentTrackerModel> })
  async getDocumentsByWorkflowId(
    @Param('workflowId') workflowId: string,
    @Param('definitionId') definitionId: string,
    @CurrentProject() projectId: TProjectId,
  ) {
    return await this.documentsService.getDocumentsByWorkflowId(
      workflowId,
      projectId,
      definitionId,
    );
  }
}
