import { Mensagem } from '../entities/Mensagem';

export interface IMensagemRepository {
  create(data: Mensagem): Promise<Mensagem>;
  findById(id_mensagem: number): Promise<Mensagem | null>;
  findAllByRemetente(id_remetente: number): Promise<Mensagem[]>;
  findAllByDestinatario(id_destinatario: number): Promise<Mensagem[]>;
  findAll(): Promise<Mensagem[]>;
  update(id_mensagem: number, data: Partial<Mensagem>): Promise<Mensagem>;
  delete(id_mensagem: number): Promise<boolean>;
}
