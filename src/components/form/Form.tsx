'use client';

import { useMemoizedFn } from 'ahooks';
import { useEffect, useImperativeHandle } from 'react';
import type { FieldValues } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

import { FormContext } from './FormContext';
import type { FormProps } from './type';
import { cn } from '@/lib/utils';

function Form<V extends FieldValues>(props: FormProps<V>) {
  const {
    children,
    showValidateMessage = true,
    layout,
    colon,
    style,
    form,
    mode = 'onChange',
    onChange = () => {},
    className,
    ...formProps
  } = props;
  const memoizeChange = useMemoizedFn(onChange);
  const methods = useForm<V>({ mode, ...formProps });
  const { watch } = methods;

  useEffect(() => {
    const subscription = watch((value) => {
      memoizeChange(value as V);
    });
    return () => subscription.unsubscribe();
  }, [watch, memoizeChange]);

  useImperativeHandle(form, () => methods);

  return (
    <FormProvider<V> {...methods}>
      <FormContext.Provider value={{ showValidateMessage, layout, colon }}>
        <div style={style} className={cn('space-y-6', className)}>
          {children}
        </div>
      </FormContext.Provider>
    </FormProvider>
  );
}

export default Form;
