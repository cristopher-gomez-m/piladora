export interface Ingresossalidas<T> {
  data:    T;
  message: string;
  error:   boolean;
}

export interface Datum {
  id:             number;
  stock:          number;
  tipo:           string;
  fecha_creacion: Date;
  creado_por:     number;
  status:         string;
}
