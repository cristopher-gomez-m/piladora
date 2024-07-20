export interface CreateProductoDTO {
  name: string
  proveedor_id: number
  marca_name: string
  peso: number
  precio: number
  categoria: Categoria;
  status: Status;
  creado_por: number;
  stock: number
  tipo: TipoStock;
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

export enum TipoStock {
  Ingreso = "ingreso",
  Salida = "salida"
}
