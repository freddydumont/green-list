/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useCallback } from 'react';
import {
  useForm,
  ErrorMessage,
  FormContext,
  NestDataObject,
  useFormContext,
} from 'react-hook-form';
import {
  Flex,
  Label,
  Input,
  Radio,
  Box,
  Checkbox,
  Text,
  Textarea,
} from '@theme-ui/components';
import { Schema } from 'yup';
import { useMachine } from '@xstate/react';
import { InputMachine } from '../inputMachine';
import isEmpty from 'lodash/isEmpty';
import { StateValue } from 'xstate';
import { useFormService } from '../hooks/useFormService';
import { FormContext as FormStateContext } from '../formMachine';

interface Props<T> {
  children: JSX.Element[] | JSX.Element;
  /** Function called when form is submitted */
  onSubmit: (data: T) => void;
  validationSchema: Schema<T>;
  validationResolver?: (
    values: T,
    validationContext?: object
  ) => {
    values: {} | T;
    errors: {} | NestDataObject<T>;
  };
}

/**
 * [Smart form component](https://react-hook-form.com/advanced-usage#SmartFormComponent).
 * Passes `react-hook-form` methods to children.
 */
export function Form<FormData>({
  children,
  onSubmit,
  validationSchema,
  validationResolver,
}: Props<FormData>) {
  const methods = useForm<FormData>({
    validationSchema,
    validationResolver,
  });

  // value and context fields match so we can use both together to retrieve
  // the current form state
  const [{ value, context }] = useFormService();
  const formState = context?.[value as Exclude<keyof FormStateContext, 'lang'>];

  // useCallback is needed to avoid infinite rerenders in useEffect
  const retrieveFormState = useCallback(() => {
    if (formState) {
      methods.reset((formState as unknown) as FormData);
    }
  }, [formState, methods]);

  // this now acts as componentDidMount, so it fires only once
  useEffect(retrieveFormState, []);

  return (
    <FormContext {...methods}>
      <Flex
        as="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{
          flexDirection: 'column',
        }}
      >
        {children}
      </Flex>
    </FormContext>
  );
}

interface FormFieldProps {
  /** Displayed label */
  label?: string;
  /** input and label name */
  name: string;
  /** HTML element to render, defaults to 'input' */
  as?: 'input' | 'textarea';
}

type FormInputProps = FormFieldProps &
  JSX.IntrinsicElements['input'] &
  JSX.IntrinsicElements['textarea'];

/**
 * Simple form input with label.
 * Tracks its state explicitely via xstate to know when valid state is reached.
 */
export function FormField({
  name,
  label,
  as = 'input',
  ...rest
}: FormInputProps) {
  const [state, send] = useMachine(InputMachine);
  const { register, errors } = useFormContext();

  // if errors is not empty, form has been validated
  // so input has to be in either valid or error state
  if (!isEmpty(errors)) {
    errors?.[name] ? send('ERROR') : send('SUCCESS');
  }

  // however, if error is empty, but a field was previously in error state,
  // it should be forced into valid state.
  // this prevents the last field to be ignored in the logic above
  if (isEmpty(errors) && state.value === 'error') {
    send('SUCCESS');
  }

  function getVariant(state: StateValue): string {
    return ({
      idle: 'input',
      error: 'inputError',
      valid: 'inputValid',
    } as Record<string, string>)[state as string];
  }

  const props = {
    variant: getVariant(state.value),
    ref: register as any,
    name,
    ...rest,
  };

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      {as === 'input' && <Input {...props} />}
      {as === 'textarea' && <Textarea sx={{ height: 24 }} {...props} />}
      <ErrorMessage
        as={<Text color="textDanger" mb={4} />}
        name={name}
        errors={errors}
      />
    </>
  );
}

type FormInputChoiceProps = {
  /** input type */
  type: 'radio' | 'checkbox';
  /** individual options, eg. a single checkbox */
  options: { label: string; value?: string }[];
} & FormInputProps;

/** Radio or checkbox input */
export function FormInputChoice({
  type,
  name,
  label,
  options,
  ...rest
}: FormInputChoiceProps) {
  const { register, errors } = useFormContext();

  const props = {
    name,
    ref: register as any,
  };

  return (
    <FormInputChoiceBox {...{ errors, name, label }}>
      {options.map(({ label, value }) => (
        <Label key={label}>
          {type === 'radio' && <Radio value={value} {...props} {...rest} />}
          {type === 'checkbox' && (
            <Checkbox value={value} {...props} {...rest} />
          )}
          {label}
        </Label>
      ))}
    </FormInputChoiceBox>
  );
}

/** Presentational layer for FormInputChoice */
export function FormInputChoiceBox({ name, label, children }: FormInputProps) {
  const { errors } = useFormContext();
  const hasError = errors?.[name];

  return (
    <Box variant={hasError ? 'box.formError' : 'box.form'}>
      {label && <Label>{label}</Label>}
      <Box
        sx={{
          boxShadow: hasError ? 'error' : 'none',
          maxWidth: 'max-content',
          pr: 2,
          borderRadius: '4px',
        }}
      >
        {children}
      </Box>
      <ErrorMessage
        as={<Text color="textDanger" mb={4} />}
        name={name}
        errors={errors}
      />
    </Box>
  );
}
