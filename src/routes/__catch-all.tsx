import { createFileRoute } from '@tanstack/react-router';
import { NotFoundPage } from '@/pages/not-found';

export const Route = createFileRoute('/__catch-all')({
  component: NotFoundPage,
});
