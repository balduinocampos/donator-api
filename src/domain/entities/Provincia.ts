export class Provincia {
  id_provincia?: number;
  nome: string;

  constructor(props: Omit<Provincia, 'id_provincia'>, id_provincia?: number) {
    Object.assign(this, props);
    if (id_provincia) this.id_provincia = id_provincia;
  }
}
