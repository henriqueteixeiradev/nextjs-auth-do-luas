"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { setCookie } from "nookies";

import { api } from "../../../lib/api";

const Login = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await api.post("/sessions", {
        email: "example@email.com",
        password: "example",
      });

      toast.success("Logado");

      setCookie(null, "access_token", data.accessToken, {
        path: "/",
      });
      router.push("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>.login</h1>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Login</legend>

          <button type="submit">Entrar</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
