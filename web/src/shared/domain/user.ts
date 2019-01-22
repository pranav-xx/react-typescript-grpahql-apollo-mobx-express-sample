import { observable, action } from "mobx";

export class User {
    @observable id: string;
    @observable username: string;
    @observable password: string;
    constructor({
        id = '',
        username = '',
        password = ''
    }) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    @action setId(id: string) {
        this.id = id;
    }
    @action setUsername(username: string) {
        this.username = username;
    }
    @action setPassword(password: string) {
        this.password = password;
    }
}
