import { Flex } from "@/components/layout";
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
import { cn } from "@/lib/utils";
import { isEmptyObject } from "@/utils/validators";
import Autoplay from "embla-carousel-autoplay";
import { Dot } from "lucide-react";
import { motion } from "motion/react";
import { ReactNode, useEffect, useState } from "react";
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
      <GridBackground>
        <HeroSection />
      </GridBackground>

      <main className="flex flex-col items-center justify-center gap-8 bg-white dark:bg-black">
        <Flex vertical className="gap-12 p-4 max-w-4xl">
          <Flex align="center" justify="between" wrap="wrap" className="w-full">
            {/* Seção Sensor */}
            <ResponsiveCard
              title="Sensor"
              description="Sensores personalizados para atender às suas necessidades.
Nossos sensores avançados monitoram condições ambientais e operacionais em tempo real, garantindo que você esteja sempre um passo à frente."
              imageUrl="https://picsum.photos/seed/asddsadfgvcx/1000/600"
            />
            {/* Seção Saas */}
            <ResponsiveCard
              title="SaaS"
              description="Nossa plataforma SaaS oferece uma interface intuitiva para gerenciar e monitorar todos os seus dispositivos e sistemas com facilidade."
              imageUrl="https://picsum.photos/seed/324ads/1000/600"
            />
          </Flex>

          {/* Seção Benefícios */}
          <Typography.Title>Benefícios</Typography.Title>
          <Flex align="center" justify="between" wrap="wrap">
            <Card className="flex-1 min-w-3xs h-52">
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
            <Card className="flex-1 min-w-3xs h-52">
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
            <Card className="flex-1 min-w-3xs h-52">
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
    <motion.header
      className={`flex top-0 z-[100] bg-transparent w-full transition-transform duration-100 ease-in-out duration-200 ${
        isScrolled
          ? "sticky p-4"
          : "relative p-4 border-b-black bg-white dark:bg-black"
      }`}
      initial={{
        opacity: 0,
        height: "0%",
      }}
      animate={{ opacity: 1, height: "100%" }}
      transition={{
        duration: 0.75,
        delay: 1,
        type: "spring",
        damping: 25,
        swiftness: 1500,
        mass: 7.5,
      }}
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
    </motion.header>
  );
};

const HeroSection = () => {
  const user = useUserDecode();
  return (
    <Flex
      justify="center"
      align="center"
      className="size-full overflow-hidden"
      vertical
    >
      <motion.div
        initial={{
          scale: 3,
          opacity: 0,
          filter: "blur(2em)",
        }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.75,
          delay: 1,
        }}
        className="max-w-3xl min-w-md bg-radial to-transparent from-white dark:from-black"
        layout
      >
        <EyeLooking />
      </motion.div>
      <Flex vertical align="center" className="max-w-4xl">
        <h1 className="text-center text-4xl font-bold text-neutral-900 dark:text-neutral-100 px-16">
          {"Monitore suas máquinas com inteligência e agilidade"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1 + 2,
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
            duration: 0.3 + 2,
            delay: 0.8 + 2,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400 px-8"
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
            delay: 1 + 2,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4 px-4"
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
            delay: 1.2 + 2,
          }}
          className="relative z-10 mt-20 rounded-3xl p-4 sm:m-0"
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
                      height: "100%",
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

const ResponsiveCard = ({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
}) => {
  return (
    <div className="group/card flex-1 min-w-sm">
      <div
        className={cn(
          "cursor-pointer bg-neutral-950 overflow-hidden relative h-96 rounded-md shadow-xl w-[100%] mx-auto flex flex-col justify-between p-4 "
        )}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:to-black bg-gradient-to-t from-black to-transparent opacity-75"></div>
        <div className="flex flex-row items-center space-x-4 z-10"></div>
        <div className="z-10">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            {title}
          </h1>
          <p className="font-normal text-sm text-neutral-50/50 z-10 my-4 overflow-hidden text-ellipsis group-hover/card:text-neutral-300 group-hover/card:h-auto h-0">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const GridBackground = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(1rem)",
        y: 10,
        marginTop: "50%",
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        marginTop: "0",
      }}
      transition={{
        duration: 1.5,
        delay: 1,
        ease: "easeInOut",
      }}
      className="relative flex w-full items-center justify-center"
    >
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="z-20 rleative">{children}</div>
    </motion.div>
  );
};
