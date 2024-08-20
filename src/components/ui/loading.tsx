import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export const Loading = (props: React.ComponentProps<typeof Loader2>) => (
  <Loader2 {...props} className={cn('animate-spin', props.className)} />
);
