// src/pages/LoginPage.tsx
import { Input } from '@/components/form/input';
import { Col, Flex } from '@/components/layout';
import Typography from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Mail } from 'lucide-react';
import React, { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import logo from "../assets/logo.png";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const a = true;
    if (!a) navigate('/app');
  };

  // if (user) navigate("/app");

  return (
    <Flex justify="between" align="center" className="h-screen w-screen">
      <Typography.Title className="absolute top-4 right-4 text-lg">
        <Link to="/">Nextron</Link>
      </Typography.Title>
      <div
        className="xs:hidden size-full sm:hidden lg:flex"
        style={{
          background: 'linear-gradient(45deg,#68e664, #1c437a)',
          borderRadius: '0 4rem 4rem 0',
          flex: 1
        }}
      />
      <Col className="flex h-full w-full flex-col items-center justify-center p-4 lg:w-5/12">
        <Card className="w-full max-w-lg lg:border-none lg:shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-4 text-4xl">Bem vindo</CardTitle>
            <CardDescription>Crie uma conta para ter acesso ao nosso sistema!</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onFinish} className="w-full space-y-3">
              <div className="space-y-2">
                <Input name="email" placeholder="E-mail" className="rounded-b-none" prefix={<Mail size={16} />} />

                <Input
                  placeholder="Password"
                  name="password"
                  type="password"
                  className="rounded-t-none rounded-b-none border-t-0 border-b-0"
                  prefix={<Lock size={16} />}
                />
                <Input
                  placeholder="Password Again"
                  name="password"
                  type="password"
                  className="rounded-t-none border-t-0"
                  prefix={<Lock size={16} />}
                />
              </div>

              <Button type="submit" className="w-full">
                Cadastrar
              </Button>

              <div className="flex justify-center">
                <Typography.Text className="text-sm text-neutral-400">
                  Ja tem uma conta?{' '}
                  <Link className="text-green-600" to="/login">
                    Entrar
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
    </Flex>
  );
};

export default RegisterPage;
