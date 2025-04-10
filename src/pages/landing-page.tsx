import { Col, Flex } from "@/components/layout";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useUserDecode } from "@/hooks/use-user";
import Autoplay from "embla-carousel-autoplay";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const carouselImages = [
  "https://www.pressmanager.com.br/wp-content/uploads/2020/08/monitoramento-1-6.png",
  "https://www.evope.com.br/wp-content/uploads/sites/2/2019/02/monitoramento-1024x485.png",
  "https://placehold.co/1200x400?text=Monitoramento+3",
];

export const LandingPage = () => {
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div>
      {/* Header Transparente */}
      <ResponsiveHeader yOffset={lastScrollY} />

      <div>
        {/* Carrossel de Imagens */}
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {carouselImages.map((src, index) => (
              <CarouselItem key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  style={{ width: "100%", height: "600px", objectFit: "cover" }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <Flex vertical className="p-16">
          {/* Seção Sensor */}
          <Flex vertical>
            <Typography.Title>Sensor</Typography.Title>
            <Flex className="xs:flex-col sm:flex-col md:flex-col lg:flex-row">
              <Col className="xs:w-full sm:w-full md:w-full lg:w-[50%]">
                <img
                  src="https://placehold.co/500x300?text=Sensor"
                  alt="Sensor"
                  className="w-full h-auto"
                />
              </Col>
              <Flex className="flex-1">
                <div>
                  <h1>
                    Sensores personalizados para atender às suas necessidades
                  </h1>
                  <p>
                    Nossos sensores avançados monitoram condições ambientais e
                    operacionais em tempo real, garantindo que você esteja
                    sempre um passo à frente.
                  </p>
                  <Button>Saiba Mais</Button>
                </div>
              </Flex>
            </Flex>
          </Flex>

          {/* Seção SaaS */}

          <Flex vertical>
            <Typography.Title className="w-full lg:text-end">
              SaaS
            </Typography.Title>
            <Flex className="xs:flex-col sm:flex-col md:flex-col lg:flex-row">
              <Col className="xs:w-full sm:w-full md:w-full lg:w-[50%] lg:order-2">
                <img
                  src="https://placehold.co/500x300?text=SaaS"
                  alt="SaaS"
                  style={{ width: "100%", height: "auto" }}
                />
              </Col>
              <Flex className="flex-1">
                <div>
                  <h1>
                    Sensores personalizados para atender às suas necessidades
                  </h1>
                  <p>
                    Nossa plataforma SaaS oferece uma interface intuitiva para
                    gerenciar e monitorar todos os seus dispositivos e sistemas
                    com facilidade.
                  </p>
                  <Button>Saiba Mais</Button>
                </div>
              </Flex>
            </Flex>
          </Flex>

          {/* Seção Benefícios */}
          <div>
            <h1>Benefícios</h1>
          </div>
          <Flex align="center" justify="between" wrap="wrap">
            <Card className="flex-1 h-48">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Dot />
                  Monitoramento 24/7
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Mantenha seu sistema sob vigilância constante e receba alertas
                  imediatos.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="flex-1 h-48">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Dot /> Relatórios Detalhados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Acesse dados e análises detalhadas para otimizar o desempenho
                  dos seus dispositivos.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="flex-1 h-48">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Dot />
                  Integração Fácil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Conecte rapidamente com outros sistemas e expanda suas
                  funcionalidades.
                </CardDescription>
              </CardContent>
            </Card>
          </Flex>
        </Flex>
      </div>

      {/* Rodapé */}
      <div style={{ textAlign: "center" }}>
        MonitorPro ©2025 - Criado com Ant Design
      </div>
    </div>
  );
};

const ResponsiveHeader = ({ yOffset }: { yOffset: number }) => {
  const user = useUserDecode();
  return (
    <header
      className={`flex top-0 z-[100] bg-transparent w-full transition-all duration-100 ease-in-out duration-200 ${
        yOffset > 60 ? "sticky p-4" : "relative p-4"
      }`}
    >
      <Flex
        align="center"
        justify="between"
        wrap="wrap"
        className={`w-full
          border border-white transition-all bg-white/50 duration-200 ease-in-out rounded-full ${
            yOffset > 60
              ? "backdrop-blur-md mx-16 my-0 shadow-xl p-2 px-4"
              : "p-2"
          }`}
      >
        <p>Nextron</p>
        {user ? (
          <Link to="/app">
            <Button
              className="rounded-full transition-colors duration-500
              bg-linear-to-tr from-sky-300 to-green-400 hover:from-green-400 hover:to-sky-300 inset-shadow-sm inset-shadow-cyan-300  shadow-green-400/25 shadow-lg"
            >
              Ir para o aplicativo
            </Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button>Entrar</Button>
          </Link>
        )}
      </Flex>
    </header>
  );
};
