# Nextron IS

## Repositório para Desenvolvimento de Prova de Conceito (PoC)

# Projeto IoT com Comunicação LoRa e Predição Baseada em Inteligência Artificial

## 1. Introdução

Este repositório contém o código-fonte, documentação e materiais suplementares referentes ao desenvolvimento de um sistema integrado de Internet das Coisas (IoT) com comunicação LoRa e inferência baseada em Inteligência Artificial (IA). O projeto foi concebido como uma colaboração entre a **Nextron IS**, uma startup de tecnologia fundada no **upLab do Senai** por alunos do próprio curso de **Análise e Desenvolvimento de Sistemas (ADS) do Senai**, e outros estudantes do mesmo curso que participaram do projeto. Essa sinergia permitiu a integração entre alunos que fazem parte da startup e aqueles que colaboraram externamente, fortalecendo o ambiente de aprendizado e inovação dentro do Senai.

O sistema proposto abrange a coleta de dados de sensores, transmissão desses dados por meio da tecnologia LoRa utilizando dispositivos ESP32 e Raspberry Pi, processamento em ambiente de nuvem com técnicas de IA para predição e visualização dos resultados. O projeto tem como objetivo não apenas o desenvolvimento de uma solução tecnológica robusta, mas também a contribuição para o conhecimento acadêmico na área de IoT e análise de dados.

## 2. Visão Geral do Sistema

O fluxo de dados do sistema compreende as seguintes etapas:

1. **Aquisição dos Dados:** Coleta de informações ambientais ou de outros parâmetros relevantes por meio de sensores.
2. **Transmissão via LoRa:** Utilização de módulos ESP32 equipados com tecnologia LoRa para transmissão dos dados coletados.
3. **Recepção e Encaminhamento:** Um **Raspberry Pi 3 Model B** acoplado a um módulo LoRa recebe os dados transmitidos e os encaminha para a nuvem.
4. **Processamento em Nuvem:** Os dados são processados em ambiente de nuvem, onde um modelo de IA realiza a análise e predição das informações coletadas.
5. **Visualização dos Resultados:** Apresentação dos resultados e dos dados brutos por meio de uma interface gráfica destinada à interpretação e análise dos mesmos.

## 3. Objetivos

Os principais objetivos do projeto incluem:

- Desenvolver uma solução integrada para coleta, transmissão, processamento e visualização de dados em tempo real.
- Implementar uma arquitetura robusta de comunicação utilizando tecnologia LoRa para garantir confiabilidade e alcance na transmissão dos dados.
- Aplicar técnicas de Inteligência Artificial para predição de dados, contribuindo para a tomada de decisão baseada em informações preditivas.
- Proporcionar aprendizado prático e interdisciplinar aos estudantes envolvidos, permitindo a integração de conhecimentos em hardware, firmware, processamento em nuvem e desenvolvimento de interfaces gráficas.

## 4. Tecnologias e Ferramentas Utilizadas

### **Hardware:**
- Sensores diversos (conforme requisitos do projeto)
- ESP32 com módulo LoRa
- Raspberry Pi 3 Model B com módulo LoRa

### **Software e Frameworks:**
- Linguagens de programação: C/C++ (para desenvolvimento do firmware) e Python (para processamento de dados e modelos de IA)
- Plataformas de nuvem (AWS, GCP ou Azure) para processamento e armazenamento de dados
- Frameworks de Inteligência Artificial: TensorFlow, PyTorch ou bibliotecas similares
- Ferramentas de visualização de dados: Frameworks web e bibliotecas de front-end

### **Ferramentas de Gestão e Controle de Versão:**
- Git e GitHub para versionamento e gerenciamento colaborativo do código-fonte
- Metodologias ágeis para organização e acompanhamento do desenvolvimento do projeto

## 5. Considerações Finais

O presente projeto representa uma iniciativa inovadora e colaborativa entre a Nextron IS e os alunos do Senai, integrando conceitos avançados de IoT, comunicação sem fio e Inteligência Artificial. A solução desenvolvida possui potencial para aplicações reais em diversos setores, contribuindo para a formação acadêmica e profissional dos estudantes envolvidos. Este repositório centraliza todo o conhecimento adquirido e produzido, servindo como referência para futuras pesquisas e inovações na área.

