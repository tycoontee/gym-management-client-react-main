import { createFileRoute } from '@tanstack/react-router';
import { RegisterPage } from '@/modules/member/register.page';
import { z } from 'zod';

export const Route = createFileRoute('/register')({
  validateSearch: z.object({
    plan: z.string().optional().catch(''),
  }),
  component: RegisterPage,
});
