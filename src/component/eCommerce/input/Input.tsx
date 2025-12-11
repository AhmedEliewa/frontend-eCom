import { Form } from "react-bootstrap";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: FieldError | string;
  formText?: string;
  success?: string;
}

const Input = ({
  label,
  type = "text",
  register,
  error,
  onBlur,
  formText,
  success,
}: InputProps) => {
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register.onBlur(e);
    } else {
      register.onBlur(e);
    }
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        {...register}
        isInvalid={!!error}
        isValid={!!success}
        onBlur={handleBlur}
      />
      <Form.Control.Feedback type="invalid">
        {error && (typeof error === "string" ? error : error.message)}
      </Form.Control.Feedback>
      <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
      <Form.Text muted>{formText}</Form.Text>
    </Form.Group>
  );
};

export default Input;
