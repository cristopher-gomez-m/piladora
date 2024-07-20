import { Proveedor } from "../Proveedor/proveedor";

export interface Marca {
  id:              number;
  name:            string;
  status:          string;
  fecha_creacion:  Date;
  creado_por:      number;
  id_proveedor?:   Proveedor;
  identificacion?: string;
}
