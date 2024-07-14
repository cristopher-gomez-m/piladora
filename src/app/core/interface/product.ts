export interface product {
  id:             number;
  name:           string;
  peso:           number;
  precio:         number;
  categoria:      Categoria;
  status:         Status;
  fecha_creacion: Date;
  creado_por:     number;
}

export enum Categoria {
  Blanco = "blanco",
  Integral = "integral",
}

export enum Status {
  A = "A",
}
