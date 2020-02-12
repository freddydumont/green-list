import React from 'react';
import {
  useForm,
  FieldError,
  ErrorMessage,
  FormContext,
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

interface Props<T> {
  children: JSX.Element[] | JSX.Element;
  /** Function called when form is submitted */
  onSubmit: (data: T) => void;
  /** TODO: remove optional when done developing form */
  validationSchema?: Schema<T>;
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
  const methods = useForm<FormData>({
    validationSchema,
  });

  return (
    <FormContext {...methods}>
      <Flex
        as="form"
        onSubmit={methods.handleSubmit(onSubmit)}
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
                      register: methods.register,
                      errors: methods.errors,
                      key: child.props.name,
                    },
                  })
                : child;
            })
          : children}
      </Flex>
    </FormContext>
  );
}

interface FormFieldProps {
  /** The Form component provides this prop */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  errors?: Record<string, FieldError>;
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
  register,
  errors,
  name,
  label,
  as = 'input',
  ...rest
}: FormInputProps) {
  const [state, send] = useMachine(InputMachine);

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
    ref: register,
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
  register,
  errors,
  type,
  name,
  label,
  options,
  ...rest
}: FormInputChoiceProps) {
  return (
    <FormInputChoiceBox {...{ errors, name, label }}>
      {options.map(({ label, value }) => (
        <Label key={label}>
          {type === 'radio' && (
            <Radio name={name} value={value} ref={register} {...rest} />
          )}
          {type === 'checkbox' && (
            <Checkbox name={name} value={value} ref={register} {...rest} />
          )}
          {label}
        </Label>
      ))}
    </FormInputChoiceBox>
  );
}

/** Presentational layer for FormInputChoice */
export function FormInputChoiceBox({
  errors,
  name,
  label,
  children,
}: FormInputProps) {
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
