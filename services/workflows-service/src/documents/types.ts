import z from 'zod';

const HiddenSchema = z.object({
  value: z.record(z.any()),
  engine: z.string(),
});

const TemplateSchema = z.object({
  id: z.string(),
  type: z.string(),
  issuer: z.object({
    country: z.string(),
  }),
  version: z.string(),
  category: z.string(),
  properties: z.record(z.any()),
  issuingVersion: z.number(),
});

const UploadSettingsSchema = z.object({
  url: z.string(),
  method: z.string(),
  headers: z.object({
    Authorization: z.string(),
  }),
  resultPath: z.string(),
});

const ValidateSchema = z.object({
  type: z.string(),
  value: z.record(z.any()),
  message: z.string().optional(),
  applyWhen: z
    .object({
      value: z.record(z.any()),
      engine: z.string(),
    })
    .optional(),
  considerRequired: z.boolean().optional(),
});

const VisibleOnSchema = z.object({
  type: z.string(),
  value: z.record(z.any()),
});

export const RawDocumentFieldSchema = z.object({
  id: z.string(),
  hidden: z.array(HiddenSchema).optional(),
  params: z.object({
    label: z.string(),
    template: TemplateSchema,
    uploadOn: z.string(),
    description: z.string(),
    uploadSettings: UploadSettingsSchema,
  }),
  element: z.string(),
  validate: z.array(ValidateSchema).optional(),
  visibleOn: z.array(VisibleOnSchema).optional(),
  valueDestination: z.string(),
});
