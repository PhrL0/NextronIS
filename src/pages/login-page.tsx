// src/pages/LoginPage.tsx
import { Input } from "@/components/form/input";
import { Col, Flex } from "@/components/layout";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useUserDecode } from "@/hooks/use-user";
import { Lock, Mail } from "lucide-react";
import React, { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
//import logo from "../assets/logo.png";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const user = useUserDecode();
  const navigate = useNavigate();

  const onFinish = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = new FormData(e.currentTarget);
    const [username, password] = [
      values.get("email") as string,
      values.get("password") as string,
    ];
    const success = await login(username, password);
    await new Promise((r) => setInterval(r, 1000));

    if (success) {
      // message.success("Login realizado com sucesso!");
      navigate("/app");
    } else {
      // message.error("Credenciais inválidas!");
    }
  };

  if (user) navigate("/app");

  return (
    <Flex justify="between" align="center" className="w-screen h-screen">
      <Typography.Title className="text-lg absolute top-4 left-4">
        <Link to="/">Nextron</Link>
      </Typography.Title>
      <Col className="h-full flex flex-col items-center justify-center p-4 w-full lg:w-5/12">
        <Card className="lg:border-none lg:shadow-none w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-4xl flex items-center gap-4">
              Bem vindo
            </CardTitle>
            <CardDescription>
              Para ter acesso aos serviços, faça login!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onFinish} className="w-full space-y-3">
              <div className="space-y-2">
                <Input
                  name="email"
                  placeholder="E-mail"
                  className="rounded-b-none"
                  prefix={<Mail size={16} />}
                />

                <Input
                  placeholder="Password"
                  name="password"
                  type="password"
                  className="rounded-t-none border-t-0"
                  prefix={<Lock size={16} />}
                />
              </div>
              <Flex align="center" justify="between">
                <Flex align="center">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Lembrar-se da senha
                  </label>
                </Flex>
                <Link
                  className="text-xs font-medium leading-none"
                  to="/forgot-password"
                >
                  Esqueci minha senha
                </Link>
              </Flex>

              <Button type="submit" className="w-full">
                Entrar
              </Button>

              <div className="flex justify-center">
                <Typography.Text className="text-sm text-neutral-400">
                  Não tem uma conta?{" "}
                  <Link className="text-green-600" to="/register">
                    Registre-se
                  </Link>
                </Typography.Text>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <CardDescription className="text-center w-full">
              Nextron © 2022. Todos os direitos reservados.
            </CardDescription>
          </CardFooter>
        </Card>
      </Col>
      <div
        className="size-full lg:flex xs:hidden sm:hidden"
        style={{
          background: "linear-gradient(45deg,#68e664, #1c437a)",
          borderRadius: "4rem 0 0 4rem",
          flex: 1,
        }}
      ></div>
    </Flex>
  );
};

export default LoginPage;
