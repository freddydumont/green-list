/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Flex, Label, Input, Radio, Box, Checkbox } from '@theme-ui/components';

interface Props {
  children: JSX.Element[] | JSX.Element;
  /** Function called when form is submitted */
  onSubmit: (data: any) => void;
}

/**
 * [Smart form component](https://react-hook-form.com/advanced-usage#SmartFormComponent).
 * Passes `react-hook-form` methods to children.
 *
 */
export function Form({ children, onSubmit }: Props) {
  const methods = useForm();
  const { handleSubmit } = methods;

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
                    register: methods.register,
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
  register?: any;
  /** Displayed label */
  label: string;
}

type FormInputProps = FormFieldProps & JSX.IntrinsicElements['input'];

/**
 * Simple form input with label
 */
export function FormField({ register, name, label, ...rest }: FormInputProps) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} ref={register} {...rest} />
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
  type,
  name,
  label,
  options,
  ...rest
}: FormInputChoiceProps) {
  return (
    <Box variant="box.form">
      <Label>{label}</Label>
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
  );
}
