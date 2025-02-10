# Nextron IS
Repositório destinado à elaboração e desenvolvimento do Projeto Integrador do 3º semestre

# Projeto IoT com Comunicação LoRa e Predição Baseada em IA

## 1. Introdução

Este repositório contém o código-fonte, documentação e materiais suplementares relativos ao desenvolvimento de um sistema integrado de Internet das Coisas (IoT). O presente projeto foi concebido e implementado por estudantes do curso de Análise e Desenvolvimento de Sistemas, no último ano de formação acadêmica, com o intuito de explorar tecnologias emergentes e práticas de engenharia de software e hardware.

O sistema proposto abrange a coleta de dados de sensores, a transmissão desses dados utilizando tecnologia LoRa através de dispositivos ESP32 e Raspberry Pi, o processamento em ambiente de nuvem por meio de técnicas de Inteligência Artificial (IA) para predição, e a subsequente visualização dos resultados. Este trabalho visa não apenas o desenvolvimento de uma solução tecnológica robusta, mas também a contribuição para o conhecimento acadêmico na área de IoT e análise de dados.

## 2. Visão Geral do Sistema

O fluxo de dados do sistema compreende as seguintes etapas:

1. **Aquisição dos Dados:** Sensores responsáveis pela coleta de informações ambientais ou de outros parâmetros relevantes.
2. **Transmissão via LoRa:** Utilização de módulos ESP32 equipados com LoRa para transmitir os dados coletados.
3. **Recepção e Encaminhamento:** O Raspberry Pi 3 Model B, acoplado a um módulo LoRa, recebe os dados transmitidos e os encaminha para a nuvem.
4. **Processamento em Nuvem:** Os dados são processados em ambiente de nuvem, onde um modelo de IA realiza a análise e predição dos dados.
5. **Visualização:** Os resultados, bem como os dados brutos, são apresentados por meio de uma interface gráfica destinada à visualização e interpretação dos mesmos.

## 3. Objetivos

Os objetivos deste projeto são:

- Desenvolver uma solução integrada que permita a coleta, transmissão, processamento e visualização de dados em tempo real.
- Implementar uma arquitetura robusta de comunicação utilizando tecnologia LoRa para garantir a confiabilidade e o alcance da transmissão.
- Aplicar técnicas de Inteligência Artificial para predição de dados, contribuindo para a tomada de decisões baseada em dados.
- Promover a aprendizagem prática e multidisciplinar entre os integrantes do grupo, integrando conhecimentos de hardware, firmware, processamento em nuvem e desenvolvimento de interfaces.

## 4. Tecnologias e Ferramentas Utilizadas

- **Hardware:**
  - Sensores diversos (tipos e especificações conforme o projeto)
  - ESP32 com módulo LoRa
  - Raspberry Pi 3 Model B com módulo LoRa

- **Software e Frameworks:**
  - Linguagens de programação: C/C++ (para desenvolvimento do firmware) e Python (para processamento e aplicação de modelos de IA)
  - Plataformas de nuvem (ex.: AWS, GCP ou Azure) para processamento e armazenamento dos dados
  - Frameworks de Inteligência Artificial: TensorFlow, PyTorch ou outras bibliotecas pertinentes
  - Ferramentas de visualização: bibliotecas de front-end e frameworks web para o desenvolvimento do dashboard

- **Ferramentas de Gestão e Controle de Versão:**
  - Git e GitHub para versionamento e gerenciamento do código-fonte
  - Metodologias ágeis para organização e acompanhamento do desenvolvimento do projeto

