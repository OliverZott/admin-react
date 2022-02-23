import { Role } from "./role";

export class User {

    constructor(
        public id: number = 0,
        public first_name: string = '',
        public last_name: string = '',
        public email: string = '',
        public role: Role = new Role()
    ) { }

    // 'get' so it works like property --> NOT WORKING in component
    get name() {
        return this.first_name + ' ' + this.last_name;
    }

}