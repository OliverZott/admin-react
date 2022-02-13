export class User {

    constructor(
        public id: number = 0,
        public first_name: string = '',
        public last_name: string = '',
        public email: string = ''
    ) { }

    // 'get' so it works like property
    get name() {
        return this.first_name + ' ' + this.last_name;
    }

}