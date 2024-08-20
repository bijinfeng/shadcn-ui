import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Search } from 'lucide-react';

import { cn } from '@/lib/utils';

type OriginInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface InputProps
  extends Omit<OriginInputProps, 'size'>,
    VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-9',
        sm: 'h-8 rounded-md',
        lg: 'h-10 rounded-md',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, ...props }, ref) => {
    return (
      <input type={type} className={cn(inputVariants({ size, className }))} ref={ref} {...props} />
    );
  },
);
Input.displayName = 'Input';

const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div className={cn('items-center', inputVariants({ size, className }))}>
        <Search size={14} className="mr-1 text-muted-foreground" />
        <input
          ref={ref}
          className="placeholder:text-muted-foreground focus-visible:outline-none"
          {...props}
        />
      </div>
    );
  },
);
InputSearch.displayName = 'InputSearch';

export { Input, InputSearch, inputVariants };
