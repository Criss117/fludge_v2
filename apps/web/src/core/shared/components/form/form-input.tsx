import type { ComponentProps } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface Props<T extends FieldValues> extends ComponentProps<"input"> {
  control: Control<T, unknown, T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  description?: string;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  ...props
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={props.id}>{label}</FieldLabel>
          <Input
            {...field}
            {...props}
            id={props.id}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
