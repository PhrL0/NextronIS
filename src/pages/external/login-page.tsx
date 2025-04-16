// src/pages/LoginPage.tsx
import { Button } from '@/shared/components/atom/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/atom/card';
import { Checkbox } from '@/shared/components/atom/checkbox';
import { Input } from '@/shared/components/atom/input';
import { Col, Flex } from '@/shared/components/atom/layout';
import Typography from '@/shared/components/atom/typography';
import { useUserDecode } from '@/shared/hooks/use-user';
import { Lock, Mail } from 'lucide-react';
import React, { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
//import logo from "../assets/logo.png";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const user = useUserDecode();
  const navigate = useNavigate();

  const onFinish = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = new FormData(e.currentTarget);
    const [username, password] = [values.get('email') as string, values.get('password') as string];
    const success = await login(username, password);
    await new Promise((r) => setInterval(r, 1000));

    if (success) {
      // message.success("Login realizado com sucesso!");
      navigate('/app');
    } else {
      // message.error("Credenciais inválidas!");
    }
  };

  if (user) navigate('/app');

  return (
    <Flex justify="between" align="center" className="h-screen w-screen">
      <Typography.Title className="absolute top-4 left-4 text-lg">
        <Link to="/">Nextron</Link>
      </Typography.Title>
      <Col className="flex h-full w-full flex-col items-center justify-center p-4 lg:w-5/12">
        <Card className="w-full max-w-lg lg:border-none lg:shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-4 text-4xl">Bem vindo</CardTitle>
            <CardDescription>Para ter acesso aos serviços, faça login!</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onFinish} className="w-full space-y-3">
              <div className="space-y-2">
                <Input name="email" placeholder="E-mail" className="rounded-b-none" prefix={<Mail size={16} />} />

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
                    className="text-xs leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Lembrar-se da senha
                  </label>
                </Flex>
                <Link className="text-xs leading-none font-medium" to="/forgot-password">
                  Esqueci minha senha
                </Link>
              </Flex>

              <Button type="submit" className="w-full">
                Entrar
              </Button>

              <div className="flex justify-center">
                <Typography.Text className="text-sm text-neutral-400">
                  Não tem uma conta?{' '}
                  <Link className="text-green-600" to="/register">
                    Registre-se
                  </Link>
                </Typography.Text>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <CardDescription className="w-full text-center">
              Nextron © 2022. Todos os direitos reservados.
            </CardDescription>
          </CardFooter>
        </Card>
      </Col>
      <div
        className="xs:hidden size-full sm:hidden lg:flex"
        style={{
          background: 'linear-gradient(45deg,#68e664, #1c437a)',
          borderRadius: '4rem 0 0 4rem',
          flex: 1
        }}
      ></div>
    </Flex>
  );
};

export default LoginPage;
