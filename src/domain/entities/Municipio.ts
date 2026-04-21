export class Municipio {
  id_municipio?: number;
  id_provincia: number;
  nome: string;

  constructor(props: Omit<Municipio, 'id_municipio'>, id_municipio?: number) {
    Object.assign(this, props);
    if (id_municipio) this.id_municipio = id_municipio;
  }
}
