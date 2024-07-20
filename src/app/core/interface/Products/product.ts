import { Marca } from "../Marca/marca";

export interface product {
  id:             number;
  name:           string;
  peso:           number;
  precio:         number;
  categoria:      Categoria;
  status:         Status;
  fecha_creacion: Date;
  creado_por:     number;
  id_marca:       Marca;
}

export enum Categoria {
  Blanco = "blanco",
  Integral = "integral",
}

export enum Status {
  Activo = "A",
  Inactivo = "I",
  Eliminado = "E",
}
