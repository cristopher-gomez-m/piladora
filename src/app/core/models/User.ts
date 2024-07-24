import { Role } from "./Role";

export class User{
    constructor(
        public id:number=0,
        public nombre:string='',
        public index:number=0,
        public name:string='',
        public username:string='',
        public password:string='',
        public role: string = '',     // Cambiado de Role a string
        public cedula:string='',
        public apellido:string='',

    ){}
}
