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
  errors?: {
    [key: string]: FieldError;
  };
  /** Displayed label */
  label: string;
  /** input and label name */
  name: string;
}

type FormInputProps = FormFieldProps & JSX.IntrinsicElements['input'];

/**
 * Simple form input with label
 */
export function FormField({
  register,
  errors,
  name,
  label,
  ...rest
}: FormInputProps) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Input
        variant={errors?.[name] ? 'inputError' : 'input'}
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
