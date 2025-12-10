import Input from "@/component/eCommerce/input/Input";
import { actRegister } from "@/store/auth/act/actRegister";
import { clearerror } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useForm, type FieldError, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

type status = "idle" | "checking" | "available" | "unavailable" | "failed";
const useCheckingEmailExists = () => {
  const [checkingEmail, setCheckingEmail] = useState<status>("idle");
  const [enteredEmail, setEnteredEmail] = useState<string | null>(null);

  const checkingEmailExists = async (email: string) => {
    setCheckingEmail("checking");
    setEnteredEmail(email);

    try {
      const response = await axios.get(`/users?email=${email}`);
      if (!response.data.length) {
        setCheckingEmail("available");
      } else {
        setCheckingEmail("unavailable");
      }
    } catch (error) {
      setCheckingEmail("failed");
    }
  };

  const reset = () => {
    setCheckingEmail("idle");
    setEnteredEmail(null);
  };

  return { checkingEmail, enteredEmail, checkingEmailExists, reset };
};

// Define the schema using Zod
const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "first name is required" }),
    lastName: z.string().min(1, { message: "last name is required" }),
    email: z.string().email().min(1, { message: "email is required" }),
    password: z
      .string()
      .min(6, { message: "password must be at least 6 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        {
          message:
            "password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
        }
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const { checkingEmail, reset, enteredEmail, checkingEmailExists } =
    useCheckingEmailExists();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getFieldState,
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(actRegister(data))
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created_successfully");
      });
  };

  const onBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    await trigger("email");
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      checkingEmailExists(value);
    }
    if (isDirty && invalid && enteredEmail) {
      reset();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearerror());
    };
  }, [dispatch]);

  if (accessToken) {
    navigate("/");
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <Form
        className="p-4 border rounded"
        style={{ width: "400px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="First Name:"
          register={register("firstName")}
          error={errors.firstName}
        />
        <Input
          label="Last Name :"
          register={register("lastName")}
          error={errors.lastName}
        />
        <Input
          label="Email address :"
          register={register("email")}
          error={
            errors.email ||
            (checkingEmail === "unavailable"
              ? ({ message: "Email is already taken" } as FieldError)
              : "") ||
            (checkingEmail === "failed"
              ? ({ message: "error from the server" } as FieldError)
              : "")
          }
          onBlur={onBlurHandler}
          formText={
            checkingEmail === "checking"
              ? "please wait we are checking the email..."
              : ""
          }
          success={
            (checkingEmail === "available" && "email is available") || ""
          }
        />
        <Input
          label="Password :"
          register={register("password")}
          error={errors.password}
          type="password"
        />
        <Input
          label="Confirm Password :"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
          type="password"
        />

        <Button
          variant="primary"
          type="submit"
          disabled={
            checkingEmail === "checking" || checkingEmail === "unavailable"
          }
        >
          Submit
        </Button>
        {loading === "failed" && error && (
          <Alert className="mt-3" variant="danger">
            {error}
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default Register;
