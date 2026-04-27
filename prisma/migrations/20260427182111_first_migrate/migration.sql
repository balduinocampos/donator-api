-- CreateEnum
CREATE TYPE "TipoSanguineo" AS ENUM ('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-');

-- CreateEnum
CREATE TYPE "StatusDoador" AS ENUM ('ativo', 'inativo', 'bloqueado');

-- CreateEnum
CREATE TYPE "StatusHospital" AS ENUM ('ativo', 'suspenso', 'inativo');

-- CreateEnum
CREATE TYPE "NivelUrgencia" AS ENUM ('urgente', 'emergencia');

-- CreateEnum
CREATE TYPE "StatusPedido" AS ENUM ('ativo', 'fechado', 'cancelado');

-- CreateEnum
CREATE TYPE "StatusNotificacao" AS ENUM ('sucesso', 'falha');

-- CreateEnum
CREATE TYPE "StatusAgenda" AS ENUM ('pendente', 'confirmada', 'rejeitada', 'concluida', 'cancelada');

-- CreateEnum
CREATE TYPE "StatusPedidoDoacao" AS ENUM ('pendente', 'aceite', 'rejeitado', 'cancelado');

-- CreateEnum
CREATE TYPE "StatusMensagem" AS ENUM ('enviada', 'lida');

-- CreateEnum
CREATE TYPE "StatusPedidoEntreHospitais" AS ENUM ('pendente', 'aceite', 'rejeitado', 'cancelado');

-- CreateTable
CREATE TABLE "provincia" (
    "id_provincia" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,

    CONSTRAINT "provincia_pkey" PRIMARY KEY ("id_provincia")
);

-- CreateTable
CREATE TABLE "municipio" (
    "id_municipio" SERIAL NOT NULL,
    "id_provincia" INTEGER NOT NULL,
    "nome" VARCHAR(60) NOT NULL,

    CONSTRAINT "municipio_pkey" PRIMARY KEY ("id_municipio")
);

-- CreateTable
CREATE TABLE "regra_classificacao" (
    "id_regra" SERIAL NOT NULL,
    "nome_nivel" VARCHAR(20) NOT NULL,
    "pontuacao_minima" INTEGER NOT NULL,
    "pontuacao_maxima" INTEGER,

    CONSTRAINT "regra_classificacao_pkey" PRIMARY KEY ("id_regra")
);

-- CreateTable
CREATE TABLE "doador" (
    "id_doador" SERIAL NOT NULL,
    "nome_completo" VARCHAR(100) NOT NULL,
    "telefone" VARCHAR(15) NOT NULL,
    "email" VARCHAR(80),
    "senha_hash" VARCHAR(255) NOT NULL,
    "tipo_sanguineo" "TipoSanguineo" NOT NULL,
    "id_municipio" INTEGER NOT NULL,
    "data_nascimento" DATE,
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusDoador" NOT NULL DEFAULT 'ativo',
    "consentimento_sms" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "doador_pkey" PRIMARY KEY ("id_doador")
);

-- CreateTable
CREATE TABLE "historico_doacao" (
    "id_historico" SERIAL NOT NULL,
    "id_doador" INTEGER NOT NULL,
    "id_hospital" INTEGER NOT NULL,
    "data_doacao" DATE NOT NULL,
    "observacao" VARCHAR(255),

    CONSTRAINT "historico_doacao_pkey" PRIMARY KEY ("id_historico")
);

-- CreateTable
CREATE TABLE "estatistica_doador" (
    "id_estatistica" SERIAL NOT NULL,
    "id_doador" INTEGER NOT NULL,
    "total_doacoes" INTEGER NOT NULL DEFAULT 0,
    "vidas_salvas" INTEGER NOT NULL DEFAULT 0,
    "total_centros" INTEGER NOT NULL DEFAULT 0,
    "pontuacao" INTEGER NOT NULL DEFAULT 0,
    "ultima_atualizacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "estatistica_doador_pkey" PRIMARY KEY ("id_estatistica")
);

-- CreateTable
CREATE TABLE "hospital" (
    "id_hospital" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "nif" VARCHAR(20) NOT NULL,
    "id_municipio" INTEGER NOT NULL,
    "endereco" VARCHAR(150) NOT NULL,
    "telefone" VARCHAR(15) NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "senha_hash" VARCHAR(255) NOT NULL,
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusHospital" NOT NULL DEFAULT 'ativo',

    CONSTRAINT "hospital_pkey" PRIMARY KEY ("id_hospital")
);

-- CreateTable
CREATE TABLE "stock" (
    "id_stock" SERIAL NOT NULL,
    "id_hospital" INTEGER NOT NULL,
    "tipo_sanguineo" "TipoSanguineo" NOT NULL,
    "quantidade_bolsas" INTEGER NOT NULL DEFAULT 0,
    "ultima_atualizacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id_stock")
);

-- CreateTable
CREATE TABLE "movimento_stock" (
    "id_movimento" SERIAL NOT NULL,
    "id_stock" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "observacao" VARCHAR(255),
    "data_movimento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movimento_stock_pkey" PRIMARY KEY ("id_movimento")
);

-- CreateTable
CREATE TABLE "pedido" (
    "id_pedido" SERIAL NOT NULL,
    "id_hospital" INTEGER NOT NULL,
    "tipo_sanguineo_necessario" "TipoSanguineo" NOT NULL,
    "quantidade_necessaria" INTEGER NOT NULL DEFAULT 1,
    "id_municipio_pedido" INTEGER NOT NULL,
    "contacto_referencia" VARCHAR(15) NOT NULL,
    "nivel_urgencia" "NivelUrgencia" NOT NULL,
    "mensagem_adicional" VARCHAR(160),
    "data_pedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_fechamento" TIMESTAMP(3),
    "status_pedido" "StatusPedido" NOT NULL DEFAULT 'ativo',
    "total_notificados" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("id_pedido")
);

-- CreateTable
CREATE TABLE "pedido_doacao" (
    "id_pedido_doacao" SERIAL NOT NULL,
    "id_doador" INTEGER NOT NULL,
    "id_hospital" INTEGER NOT NULL,
    "mensagem" VARCHAR(255),
    "status" "StatusPedidoDoacao" NOT NULL DEFAULT 'pendente',
    "motivo_rejeicao" VARCHAR(255),
    "data_solicitacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_resposta" TIMESTAMP(3),

    CONSTRAINT "pedido_doacao_pkey" PRIMARY KEY ("id_pedido_doacao")
);

-- CreateTable
CREATE TABLE "agenda" (
    "id_agenda" SERIAL NOT NULL,
    "id_doador" INTEGER NOT NULL,
    "id_hospital" INTEGER NOT NULL,
    "data_agendada" DATE NOT NULL,
    "hora_agendada" TIME NOT NULL,
    "status" "StatusAgenda" NOT NULL DEFAULT 'pendente',
    "observacao_doador" VARCHAR(255),
    "observacao_hospital" VARCHAR(255),
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agenda_pkey" PRIMARY KEY ("id_agenda")
);

-- CreateTable
CREATE TABLE "notificacao" (
    "id_notificacao" SERIAL NOT NULL,
    "id_pedido" INTEGER NOT NULL,
    "id_doador" INTEGER NOT NULL,
    "mensagem_enviada" TEXT NOT NULL,
    "data_envio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status_envio" "StatusNotificacao" NOT NULL,
    "codigo_erro" VARCHAR(50),

    CONSTRAINT "notificacao_pkey" PRIMARY KEY ("id_notificacao")
);

-- CreateTable
CREATE TABLE "mensagem" (
    "id_mensagem" SERIAL NOT NULL,
    "id_remetente" INTEGER NOT NULL,
    "id_destinatario" INTEGER NOT NULL,
    "id_pedido_entre" INTEGER,
    "assunto" VARCHAR(150),
    "conteudo" TEXT NOT NULL,
    "status" "StatusMensagem" NOT NULL DEFAULT 'enviada',
    "data_envio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_leitura" TIMESTAMP(3),

    CONSTRAINT "mensagem_pkey" PRIMARY KEY ("id_mensagem")
);

-- CreateTable
CREATE TABLE "pedido_entre_hospitais" (
    "id_pedido_entre" SERIAL NOT NULL,
    "id_solicitante" INTEGER NOT NULL,
    "id_fornecedor" INTEGER NOT NULL,
    "tipo_sanguineo" "TipoSanguineo" NOT NULL,
    "quantidade_bolsas" INTEGER NOT NULL,
    "status" "StatusPedidoEntreHospitais" NOT NULL DEFAULT 'pendente',
    "motivo_rejeicao" VARCHAR(255),
    "data_solicitacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_resposta" TIMESTAMP(3),

    CONSTRAINT "pedido_entre_hospitais_pkey" PRIMARY KEY ("id_pedido_entre")
);

-- CreateTable
CREATE TABLE "sessao_admin" (
    "id_sessao" VARCHAR(64) NOT NULL,
    "id_hospital" INTEGER NOT NULL,
    "ip_origem" VARCHAR(45) NOT NULL,
    "user_agent" VARCHAR(255),
    "data_login" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_expiracao" TIMESTAMP(3) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "sessao_admin_pkey" PRIMARY KEY ("id_sessao")
);

-- CreateTable
CREATE TABLE "sessao_doador" (
    "id_sessao" VARCHAR(64) NOT NULL,
    "id_doador" INTEGER NOT NULL,
    "ip_origem" VARCHAR(45) NOT NULL,
    "user_agent" VARCHAR(255),
    "data_login" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_expiracao" TIMESTAMP(3) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "sessao_doador_pkey" PRIMARY KEY ("id_sessao")
);

-- CreateTable
CREATE TABLE "log_acesso" (
    "id_log" SERIAL NOT NULL,
    "id_hospital" INTEGER,
    "id_doador" INTEGER,
    "acao" VARCHAR(50) NOT NULL,
    "descricao" TEXT NOT NULL,
    "ip_origem" VARCHAR(45) NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_acesso_pkey" PRIMARY KEY ("id_log")
);

-- CreateIndex
CREATE UNIQUE INDEX "provincia_nome_key" ON "provincia"("nome");

-- CreateIndex
CREATE INDEX "municipio_id_provincia_idx" ON "municipio"("id_provincia");

-- CreateIndex
CREATE UNIQUE INDEX "municipio_id_provincia_nome_key" ON "municipio"("id_provincia", "nome");

-- CreateIndex
CREATE UNIQUE INDEX "regra_classificacao_nome_nivel_key" ON "regra_classificacao"("nome_nivel");

-- CreateIndex
CREATE UNIQUE INDEX "doador_telefone_key" ON "doador"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "doador_email_key" ON "doador"("email");

-- CreateIndex
CREATE INDEX "doador_tipo_sanguineo_idx" ON "doador"("tipo_sanguineo");

-- CreateIndex
CREATE INDEX "doador_id_municipio_idx" ON "doador"("id_municipio");

-- CreateIndex
CREATE INDEX "historico_doacao_id_doador_idx" ON "historico_doacao"("id_doador");

-- CreateIndex
CREATE INDEX "historico_doacao_id_hospital_idx" ON "historico_doacao"("id_hospital");

-- CreateIndex
CREATE INDEX "historico_doacao_data_doacao_idx" ON "historico_doacao"("data_doacao");

-- CreateIndex
CREATE UNIQUE INDEX "estatistica_doador_id_doador_key" ON "estatistica_doador"("id_doador");

-- CreateIndex
CREATE UNIQUE INDEX "hospital_nif_key" ON "hospital"("nif");

-- CreateIndex
CREATE UNIQUE INDEX "hospital_email_key" ON "hospital"("email");

-- CreateIndex
CREATE INDEX "hospital_id_municipio_idx" ON "hospital"("id_municipio");

-- CreateIndex
CREATE INDEX "stock_id_hospital_idx" ON "stock"("id_hospital");

-- CreateIndex
CREATE UNIQUE INDEX "stock_id_hospital_tipo_sanguineo_key" ON "stock"("id_hospital", "tipo_sanguineo");

-- CreateIndex
CREATE INDEX "movimento_stock_id_stock_idx" ON "movimento_stock"("id_stock");

-- CreateIndex
CREATE INDEX "movimento_stock_data_movimento_idx" ON "movimento_stock"("data_movimento");

-- CreateIndex
CREATE INDEX "pedido_tipo_sanguineo_necessario_idx" ON "pedido"("tipo_sanguineo_necessario");

-- CreateIndex
CREATE INDEX "pedido_status_pedido_idx" ON "pedido"("status_pedido");

-- CreateIndex
CREATE INDEX "pedido_data_pedido_idx" ON "pedido"("data_pedido");

-- CreateIndex
CREATE INDEX "pedido_doacao_id_doador_idx" ON "pedido_doacao"("id_doador");

-- CreateIndex
CREATE INDEX "pedido_doacao_id_hospital_idx" ON "pedido_doacao"("id_hospital");

-- CreateIndex
CREATE INDEX "pedido_doacao_status_idx" ON "pedido_doacao"("status");

-- CreateIndex
CREATE INDEX "agenda_id_doador_idx" ON "agenda"("id_doador");

-- CreateIndex
CREATE INDEX "agenda_id_hospital_idx" ON "agenda"("id_hospital");

-- CreateIndex
CREATE INDEX "agenda_data_agendada_idx" ON "agenda"("data_agendada");

-- CreateIndex
CREATE INDEX "agenda_status_idx" ON "agenda"("status");

-- CreateIndex
CREATE INDEX "notificacao_id_pedido_idx" ON "notificacao"("id_pedido");

-- CreateIndex
CREATE INDEX "notificacao_id_doador_idx" ON "notificacao"("id_doador");

-- CreateIndex
CREATE INDEX "notificacao_data_envio_idx" ON "notificacao"("data_envio");

-- CreateIndex
CREATE INDEX "mensagem_id_remetente_idx" ON "mensagem"("id_remetente");

-- CreateIndex
CREATE INDEX "mensagem_id_destinatario_idx" ON "mensagem"("id_destinatario");

-- CreateIndex
CREATE INDEX "mensagem_id_pedido_entre_idx" ON "mensagem"("id_pedido_entre");

-- CreateIndex
CREATE INDEX "mensagem_data_envio_idx" ON "mensagem"("data_envio");

-- CreateIndex
CREATE INDEX "pedido_entre_hospitais_id_solicitante_idx" ON "pedido_entre_hospitais"("id_solicitante");

-- CreateIndex
CREATE INDEX "pedido_entre_hospitais_id_fornecedor_idx" ON "pedido_entre_hospitais"("id_fornecedor");

-- CreateIndex
CREATE INDEX "pedido_entre_hospitais_status_idx" ON "pedido_entre_hospitais"("status");

-- CreateIndex
CREATE INDEX "sessao_admin_id_hospital_idx" ON "sessao_admin"("id_hospital");

-- CreateIndex
CREATE INDEX "sessao_admin_ativo_idx" ON "sessao_admin"("ativo");

-- CreateIndex
CREATE INDEX "sessao_admin_data_expiracao_idx" ON "sessao_admin"("data_expiracao");

-- CreateIndex
CREATE INDEX "sessao_doador_id_doador_idx" ON "sessao_doador"("id_doador");

-- CreateIndex
CREATE INDEX "sessao_doador_ativo_idx" ON "sessao_doador"("ativo");

-- CreateIndex
CREATE INDEX "log_acesso_id_hospital_idx" ON "log_acesso"("id_hospital");

-- CreateIndex
CREATE INDEX "log_acesso_id_doador_idx" ON "log_acesso"("id_doador");

-- CreateIndex
CREATE INDEX "log_acesso_data_hora_idx" ON "log_acesso"("data_hora");

-- CreateIndex
CREATE INDEX "log_acesso_acao_idx" ON "log_acesso"("acao");

-- AddForeignKey
ALTER TABLE "municipio" ADD CONSTRAINT "municipio_id_provincia_fkey" FOREIGN KEY ("id_provincia") REFERENCES "provincia"("id_provincia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doador" ADD CONSTRAINT "doador_id_municipio_fkey" FOREIGN KEY ("id_municipio") REFERENCES "municipio"("id_municipio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_doacao" ADD CONSTRAINT "historico_doacao_id_doador_fkey" FOREIGN KEY ("id_doador") REFERENCES "doador"("id_doador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_doacao" ADD CONSTRAINT "historico_doacao_id_hospital_fkey" FOREIGN KEY ("id_hospital") REFERENCES "hospital"("id_hospital") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estatistica_doador" ADD CONSTRAINT "estatistica_doador_id_doador_fkey" FOREIGN KEY ("id_doador") REFERENCES "doador"("id_doador") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospital" ADD CONSTRAINT "hospital_id_municipio_fkey" FOREIGN KEY ("id_municipio") REFERENCES "municipio"("id_municipio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_id_hospital_fkey" FOREIGN KEY ("id_hospital") REFERENCES "hospital"("id_hospital") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimento_stock" ADD CONSTRAINT "movimento_stock_id_stock_fkey" FOREIGN KEY ("id_stock") REFERENCES "stock"("id_stock") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_id_hospital_fkey" FOREIGN KEY ("id_hospital") REFERENCES "hospital"("id_hospital") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_id_municipio_pedido_fkey" FOREIGN KEY ("id_municipio_pedido") REFERENCES "municipio"("id_municipio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_doacao" ADD CONSTRAINT "pedido_doacao_id_doador_fkey" FOREIGN KEY ("id_doador") REFERENCES "doador"("id_doador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_doacao" ADD CONSTRAINT "pedido_doacao_id_hospital_fkey" FOREIGN KEY ("id_hospital") REFERENCES "hospital"("id_hospital") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda" ADD CONSTRAINT "agenda_id_doador_fkey" FOREIGN KEY ("id_doador") REFERENCES "doador"("id_doador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda" ADD CONSTRAINT "agenda_id_hospital_fkey" FOREIGN KEY ("id_hospital") REFERENCES "hospital"("id_hospital") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacao" ADD CONSTRAINT "notificacao_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "pedido"("id_pedido") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacao" ADD CONSTRAINT "notificacao_id_doador_fkey" FOREIGN KEY ("id_doador") REFERENCES "doador"("id_doador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagem" ADD CONSTRAINT "mensagem_id_remetente_fkey" FOREIGN KEY ("id_remetente") REFERENCES "hospital"("id_hospital") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagem" ADD CONSTRAINT "mensagem_id_destinatario_fkey" FOREIGN KEY ("id_destinatario") REFERENCES "hospital"("id_hospital") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagem" ADD CONSTRAINT "mensagem_id_pedido_entre_fkey" FOREIGN KEY ("id_pedido_entre") REFERENCES "pedido_entre_hospitais"("id_pedido_entre") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_entre_hospitais" ADD CONSTRAINT "pedido_entre_hospitais_id_solicitante_fkey" FOREIGN KEY ("id_solicitante") REFERENCES "hospital"("id_hospital") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_entre_hospitais" ADD CONSTRAINT "pedido_entre_hospitais_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "hospital"("id_hospital") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessao_admin" ADD CONSTRAINT "sessao_admin_id_hospital_fkey" FOREIGN KEY ("id_hospital") REFERENCES "hospital"("id_hospital") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessao_doador" ADD CONSTRAINT "sessao_doador_id_doador_fkey" FOREIGN KEY ("id_doador") REFERENCES "doador"("id_doador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_acesso" ADD CONSTRAINT "log_acesso_id_hospital_fkey" FOREIGN KEY ("id_hospital") REFERENCES "hospital"("id_hospital") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_acesso" ADD CONSTRAINT "log_acesso_id_doador_fkey" FOREIGN KEY ("id_doador") REFERENCES "doador"("id_doador") ON DELETE SET NULL ON UPDATE CASCADE;
