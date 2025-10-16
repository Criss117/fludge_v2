import type { ComponentProps } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { cn } from "../../lib/utils";

interface Props<T extends FieldValues> extends ComponentProps<"textarea"> {
  control: Control<T, unknown, T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  description?: string;
  textAreaClassName?: string;
}

export function FormTextArea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  textAreaClassName,
  ...props
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={props.id}>{label}</FieldLabel>
          <Textarea
            {...field}
            {...props}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            className={cn(textAreaClassName)}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
