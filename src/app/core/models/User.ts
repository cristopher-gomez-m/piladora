import { Role } from "./Role";

export class User{
    constructor(
        public id:number=0,
        public name:string='',
        public username:string='',
        public role:Role=new Role(),
    ){}
}