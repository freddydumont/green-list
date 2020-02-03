import React from 'react';
import { useForm, FieldError, ErrorMessage } from 'react-hook-form';
import {
  Flex,
  Label,
  Input,
  Radio,
  Box,
  Checkbox,
  Text,
} from '@theme-ui/components';
import { Schema } from 'yup';
import { useMachine } from '@xstate/react';
import { InputMachine } from '../inputMachine';
import isEmpty from 'lodash/isEmpty';
import { StateValue } from 'xstate';

interface Props<T> {
  children: JSX.Element[] | JSX.Element;
  /** Function called when form is submitted */
  onSubmit: (data: T) => void;
  validationSchema: Schema<T>;
}

/**
 * [Smart form component](https://react-hook-form.com/advanced-usage#SmartFormComponent).
 * Passes `react-hook-form` methods to children.
 *
 */
export function Form<FormData>({
  children,
  onSubmit,
  validationSchema,
}: Props<FormData>) {
  const { handleSubmit, register, errors } = useForm<FormData>({
    validationSchema,
  });

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        flexDirection: 'column',
      }}
    >
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    errors,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </Flex>
  );
}

interface FormFieldProps {
  /** The Form component provides this prop */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  errors?: Record<string, FieldError>;
  /** Displayed label */
  label: string;
  /** input and label name */
  name: string;
}

type FormInputProps = FormFieldProps & JSX.IntrinsicElements['input'];

/**
 * Simple form input with label.
 * Tracks its state explicitely via xstate to know when valid state is reached.
 */
export function FormField({
  register,
  errors,
  name,
  label,
  ...rest
}: FormInputProps) {
  const [state, send] = useMachine(InputMachine);

  // if errors is not empty, form has been validated
  // so input has to be in either valid or error state
  if (!isEmpty(errors)) {
    errors?.[name] ? send('ERROR') : send('SUCCESS');
  }

  function getVariant(state: StateValue): string {
    return ({
      idle: 'input',
      error: 'inputError',
      valid: 'inputValid',
    } as Record<string, string>)[state as string];
  }

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Input
        variant={getVariant(state.value)}
        name={name}
        ref={register}
        {...rest}
      />
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
  options: { label: string; value: string }[];
} & FormInputProps;

/**
 * Radio or checkbox input.
 */
export function FormInputChoice({
  register,
  errors,
  type,
  name,
  label,
  options,
  ...rest
}: FormInputChoiceProps) {
  const hasError = errors?.[name];

  return (
    <Box variant={hasError ? 'box.formError' : 'box.form'}>
      <Label>{label}</Label>
      <Box
        sx={{
          boxShadow: hasError ? 'error' : 'none',
          maxWidth: 'max-content',
          pr: 2,
          borderRadius: '4px',
        }}
      >
        {options.map(({ label, value }) => (
          <Label key={value}>
            {type === 'radio' && (
              <Radio name={name} value={value} ref={register} {...rest} />
            )}
            {type === 'checkbox' && (
              <Checkbox name={name} value={value} ref={register} {...rest} />
            )}
            {label}
          </Label>
        ))}
      </Box>
      <ErrorMessage
        as={<Text color="textDanger" mb={4} />}
        name={name}
        errors={errors}
      />
    </Box>
  );
}
