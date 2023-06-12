import z from 'zod';
import { createZodDto } from 'nestjs-zod';

export const provide2faCodeDtoSchema = z.object({
  tfaCode: z.string().regex(/\d{6}/),
  deviceId: z.string().min(1),
});

export class Provide2faCodeDto extends createZodDto(provide2faCodeDtoSchema) {}