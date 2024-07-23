export interface CreateProductoDTO {
  name: string
  proveedorId: number
  marcaName: string
  peso: number
  precio: number
  categoria: Categoria;
  creado_por: number;
  stock: number
}

export interface ModifaProductoDTO{
  name: string;
  id_marca: number;
  peso: number;
  precio: number;
  creado_por: number;
  categoria: string;
  status: string;
}

export enum Categoria {
  Blanco = "blanco",
  Integral = "integral",
}

