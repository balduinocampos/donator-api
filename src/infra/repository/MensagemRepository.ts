import { IMensagemRepository } from '@/domain/contracts/IMensagemRepository';
import { Mensagem } from '@/domain/entities/Mensagem';
import { prisma } from '@/infra/db/connect';
//import { StatusMensagem } from '@prisma/client';

export class MensagemRepository implements IMensagemRepository {
  async create(data: Mensagem): Promise<Mensagem> {
    const created = await prisma.mensagem.create({
      data: {
        id_remetente: data.id_remetente,
        id_destinatario: data.id_destinatario,
        id_pedido_entre: data.id_pedido_entre,
        assunto: data.assunto,
        conteudo: data.conteudo
      }
    });
    return created as unknown as Mensagem;
  }

  async findById(id_mensagem: number): Promise<Mensagem | null> {
    const m = await prisma.mensagem.findUnique({ where: { id_mensagem } });
    return m as unknown as Mensagem | null;
  }

  async findAllByRemetente(id_remetente: number): Promise<Mensagem[]> {
    const m = await prisma.mensagem.findMany({ where: { id_remetente } });
    return m as unknown as Mensagem[];
  }

  async findAllByDestinatario(id_destinatario: number): Promise<Mensagem[]> {
    const m = await prisma.mensagem.findMany({ where: { id_destinatario } });
    return m as unknown as Mensagem[];
  }

  async findAll(): Promise<Mensagem[]> {
    const m = await prisma.mensagem.findMany();
    return m as unknown as Mensagem[];
  }

  async update(id_mensagem: number, data: Partial<Mensagem>): Promise<Mensagem> {
    const updated = await prisma.mensagem.update({
      where: { id_mensagem },
      data: data as any
    });
    return updated as unknown as Mensagem;
  }

  async delete(id_mensagem: number): Promise<boolean> {
    await prisma.mensagem.delete({ where: { id_mensagem } });
    return true;
  }
}
