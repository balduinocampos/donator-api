# BLOOD HUB
API backend desenvolvida com Python, Django e PostgreSQL para uma plataforma de gestão de doação de sangue em Angola.

A plataforma conecta doadores voluntários com hospitais, permitindo que hospitais gerenciem pedidos de sangue e que doadores encontrem locais próximos para realizar doações e salvar vidas

## O objetivo do sistema é facilitar a comunicação entre hospitais e doadores, permitindo:

Encontrar hospitais próximos
Agendar doações
Gerenciar banco de sangue
Emitir alertas de emergência
Acompanhar histórico de doações
Gerenciar doadores e stock de sangue

## Tecnologias Utilizadas
Python
Django
Django REST Framework
PostgreSQL
JWT Authentication

donator-api/
│
├── donors/              # Funcionalidades do doador
├── hospitals/           # Gestão de hospitais
├── notifications/       # Sistema de notificações
├── config/              # Configurações principais do Django
│
├── manage.py
├── requirements.txt
└── README.md

## Tipos de Utilizadores

O sistema possui dois tipos principais de utilizadores:

 Doador

Pessoa voluntária que deseja doar sangue.

 Hospital

Instituição médica responsável por gerenciar doações e emergências.

### Funcionalidades do Doador

O doador possui acesso às seguintes funcionalidades:

Criar conta
Autenticar-se no sistema
Visualizar hospitais próximos ao seu distrito ou município
Agendar doações
Visualizar agenda de doações
Ver histórico de doações realizadas
Visualizar locais onde já realizou doações
Editar dados pessoais
Consultar pontuação de acordo com:
número de doações
número de vidas salvas
Receber notificações sobre:
pedidos aceites
pedidos recusados
emergências hospitalares

## Funcionalidades do Hospital

Os hospitais possuem acesso a um dashboard administrativo com as seguintes funcionalidades:

### Sistema de Emergência

Permite emitir alertas para doadores próximos.

Quando uma emergência é emitida:

Doadores próximos recebem notificações
O hospital pode solicitar tipos específicos de sangue
🩸 Gestão de Stock de Sangue

### Hospitais podem:

Visualizar quantidade de sangue disponível
Atualizar stock manualmente
Gerenciar entrada e saída de bolsas de sangue
 Gestão de Doadores

### Hospitais podem:

Aprovar pedidos de doação
Rejeitar pedidos
Visualizar doadores disponíveis
Visualizar doadores pendentes
 Comunicação entre Hospitais

### Hospitais podem:

Enviar mensagens para outros hospitais
Solicitar bolsas de sangue
Coordenar emergências
 Perfil do Hospital

### Hospitais podem:

Visualizar dados institucionais
Atualizar informações do hospital

## Instalação do Projeto
Clonar o repositório
git remote add origin https://github.com/balduinocampos/donator-api.git

cd donator-api

## Criar Ambiente Virtual
python -m venv venv

Linux / Mac: source venv/bin/activate

Windows:venv\Scripts\activate

## Instalar Dependências
pip install -r requirements.txt