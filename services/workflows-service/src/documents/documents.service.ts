import { Injectable } from '@nestjs/common';
import { UiDefinitionService } from '@/ui-definition/ui-definition.service';
import type { TProjectId } from '@/types';
import { RawDocumentFieldSchema } from './types';
import { WorkflowService } from '@/workflow/workflow.service';
import { isObject } from '@ballerine/common';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly uiDefinitionService: UiDefinitionService,
    private readonly workflowService: WorkflowService,
  ) {}

  async getDocumentsByWorkflowId(
    workflowRuntimeId: string,
    projectId: TProjectId,
    workflowDefinitionId: string,
  ) {
    const uiDefinition = await this.uiDefinitionService.getByWorkflowDefinitionId(
      workflowDefinitionId,
      'collection_flow',
      [projectId],
    );

    console.log('uiDefinition', uiDefinition);

    if (!isObject(uiDefinition.uiSchema)) {
      return [];
    }

    const uiSchema = uiDefinition.uiSchema as { elements: any[] };

    const documentFields = this.findDocumentFields(uiSchema);

    return documentFields;

    const workflowContext = await this.workflowService.getWorkflowRuntimeDataById(
      workflowRuntimeId,
      {
        select: {
          context: true,
        },
      },
      [projectId],
    );

    return workflowContext;

    // return documents;
  }

  private findDocumentFields(node: any): Array<typeof RawDocumentFieldSchema> {
    if (!node || typeof node !== 'object') {
      return [];
    }

    const results: Array<typeof RawDocumentFieldSchema> = [];
    const stack: any[] = [node];

    while (stack.length) {
      const current = stack.pop();

      if (current?.element === 'documentfield') {
        results.push(current as typeof RawDocumentFieldSchema);
      }

      if (Array.isArray(current?.elements)) {
        stack.push(...current.elements);
      }

      if (Array.isArray(current?.children)) {
        stack.push(...current.children);
      }
    }

    return results;
  }
}
