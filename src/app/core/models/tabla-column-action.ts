export interface TableColumns {
  field: string;
  header: string;
  width?: string;
  format?: string; //formato de la columna
  dataType?: 'date'; //tipo de dato de la columna
  pipe?: string;
  pipeArgs? : any;
}

export interface Accion<T = any>{
  accion:string;
  fila? : T
}
