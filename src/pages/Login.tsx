import Input from "@/component/eCommerce/input/Input";
import { actLogin } from "@/store/auth/act/actLogin";
import { clearerror } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import z from "zod";

const formSchema = z.object({
  email: z.string().email().min(1, { message: "email is required" }),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters" }),
});

type FormData = z.infer<typeof formSchema>;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (searchParams.get("message")) setSearchParams("");
    dispatch(actLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  useEffect(() => {
    return () => {
      dispatch(clearerror());
    };
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) navigate("/");
  }, [accessToken, navigate]);
  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <Form
        className="p-4 border rounded"
        style={{ width: "400px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {searchParams.get("message") && (
          <Alert variant="success">{searchParams.get("message")}</Alert>
        )}
        <Input
          label="Email:"
          type="email"
          register={register("email")}
          error={errors.email}
        />
        <Input
          label="Password:"
          type="password"
          register={register("password")}
          error={errors.password}
        />
        <Button variant="primary" type="submit">
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

export default Login;
