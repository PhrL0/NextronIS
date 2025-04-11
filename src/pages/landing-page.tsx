import { Col, Flex } from "@/components/layout";
import EyeLooking from "@/components/lottie/eye-looking";
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
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useUserDecode } from "@/hooks/use-user";
import { isEmptyObject } from "@/utils/validators";
import Autoplay from "embla-carousel-autoplay";
import { Dot } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const carouselImages = [
  `https://picsum.photos/seed/fd/1200/400`,
  `https://picsum.photos/seed/dfghdgfh/1200/400`,
  `https://picsum.photos/seed/sadsad/1200/400`,
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
    <>
      {/* Header Transparente */}
      <ResponsiveHeader yOffset={lastScrollY} />
      <HeroSection />
      <main className="flex flex-col items-center justify-center gap-8 p-4">
        <Flex vertical className="p-16 gap-12 max-w-6xl">
          {/* Seção Sensor */}
          <Flex vertical>
            <Flex className="flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row gap-6">
              <Col className="xs:w-full sm:w-full md:w-full lg:w-[50%]">
                <img
                  src={`https://picsum.photos/seed/dassad/1000/600`}
                  alt="Sensor"
                  className="w-full h-auto rounded-lg"
                />
              </Col>
              <Flex className="flex-1" vertical>
                <Typography.Title>Sensor</Typography.Title>
                <div>
                  <h1>
                    Sensores personalizados para atender às suas necessidades
                  </h1>
                  <p>
                    Nossos sensores avançados monitoram condições ambientais e
                    operacionais em tempo real, garantindo que você esteja
                    sempre um passo à frente.
                  </p>
                </div>
              </Flex>
            </Flex>
          </Flex>

          {/* Seção SaaS */}

          <Flex vertical>
            <Flex className="flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row gap-6">
              <Col className="xs:w-full sm:w-full md:w-full lg:w-[50%] lg:order-2">
                <img
                  src={`https://picsum.photos/seed/asddsadfgvcx/1000/600`}
                  alt="SaaS"
                  className="w-full h-auto rounded-lg"
                />
              </Col>
              <Flex className="flex-1" justify="between" vertical>
                <Typography.Title className="w-full">SaaS</Typography.Title>
                <div>
                  <h1>
                    Sensores personalizados para atender às suas necessidades
                  </h1>
                  <p>
                    Nossa plataforma SaaS oferece uma interface intuitiva para
                    gerenciar e monitorar todos os seus dispositivos e sistemas
                    com facilidade.
                  </p>
                </div>
              </Flex>
            </Flex>
          </Flex>

          {/* Seção Benefícios */}
          <Typography.Title>Benefícios</Typography.Title>
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
      </main>

      {/* Rodapé */}
      <footer style={{ textAlign: "center" }}>
        MonitorPro ©2025 - Criado com Ant Design
      </footer>
    </>
  );
};

const ResponsiveHeader = ({ yOffset }: { yOffset: number }) => {
  const user = useUserDecode();
  const isScrolled = yOffset > 400;
  return (
    <header
      className={`flex top-0 z-[100] bg-transparent w-full transition-all duration-100 ease-in-out duration-200 ${
        isScrolled ? "sticky p-4" : "relative p-4 border-b-black"
      }`}
    >
      <Flex
        align="center"
        justify="between"
        wrap="wrap"
        className={`w-full transition-all duration-200 ease-in-out rounded-full ${
          isScrolled
            ? "backdrop-blur-md mx-16 my-0 shadow-xl p-4 px-8 bg-neutral-200/50 dark:bg-black/50 dark:border-neutral-700 border border-neutral-200"
            : "p-2"
        }`}
      >
        <p>Nextron</p>
        <Flex className="gap-4" align="center">
          <ModeToggle />
          {!isEmptyObject(user) ? (
            <Link to="/app">
              <Button
                className="rounded-full transition-colors duration-500
              bg-linear-to-tr from-sky-300 to-green-400 hover:from-green-400 hover:to-sky-300 inset-shadow-sm inset-shadow-cyan-300  shadow-green-400/25 shadow-lg"
              >
                Ir para o aplicativo
              </Button>
            </Link>
          ) : (
            isScrolled && (
              <Link to="/login">
                <Button>Entrar</Button>
              </Link>
            )
          )}{" "}
        </Flex>
      </Flex>
    </header>
  );
};

const HeroSection = () => {
  const user = useUserDecode();
  return (
    <Flex justify="center" align="center" className="size-full" vertical>
      <EyeLooking />

      <Flex vertical align="center">
        <h1 className="text-center text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          {"Monitore suas máquinas com inteligência e agilidade"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Com nosso sistema baseado em IA, você acompanha o desempenho em tempo
          real, identifica falhas rapidamente e reduz o tempo de resposta — tudo
          em poucos minutos, não em dias.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {isEmptyObject(user) && (
            <Link to="/login">
              <Button className="w-60 transform rounded-lg">Entrar</Button>
            </Link>
          )}
          <Button className="w-60 transform rounded-lg" variant="outline">
            Suporte
          </Button>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl p-4 m-[5%] sm:m-0 max-w-4xl"
        >
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
                    className="rounded-2xl"
                    src={src}
                    alt={`Slide ${index + 1}`}
                    style={{
                      width: "100%",

                      objectFit: "cover",
                      aspectRatio: "16/9",
                    }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </Flex>
    </Flex>
  );
};
