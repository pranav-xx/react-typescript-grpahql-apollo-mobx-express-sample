import { action, observable, computed } from 'mobx';
import { User } from '../domain/user';
import { required } from '../utils';
import { Form } from './form.store';
import gql from 'graphql-tag';
import { makePromise, execute } from 'apollo-link';
import { httpLink } from '../../config';

const loginQuery = gql`
    query Login($username: String, $password: String) {
        login(username: $username, password: $password) {
            id,
            username
        }
    }
`;
export class LoginStore {
    @observable loginForm: Form;
    @observable loggedInUser: User;
    @observable loading: boolean;
    @observable loginError: string;
    @observable redirectBackPath: string
    constructor() {
        this.loginForm = new Form([
            {name: 'username', validators: [required]},
            {name: 'password', validators: [required]}
        ]);
        const userFromLocalStorage = localStorage.getItem('user');
        this.loggedInUser = userFromLocalStorage ? new User(JSON.parse(userFromLocalStorage)) : new User({});
        this.loading = false;
        this.loginError = '';
        this.redirectBackPath = '';
    }

    @action login() {
        console.log('this.loginForm.hasError ----' + this.loginForm.hasError);
        if (!this.loginForm.hasError) {
            this.loginError = '';
            this.loading = true;
            makePromise(execute(httpLink, { query: loginQuery, variables: {...this.loginForm.formValues}}))
            .then(result => {
                this.loading = false;
                if (result.data.login) {
                    this.loggedInUser = new User(result.data.login);
                    localStorage.setItem('user', JSON.stringify(this.loggedInUser));
                } else {
                    this.loginError = 'Invalid username or password';
                }
            })
            .catch(error => {
                this.loginError = error.message;
                this.loading = false;
            });
        }
    }
    
    @action logout() {
        this.loggedInUser = new User({});
        localStorage.removeItem('user');
    }

    @computed get isLoggedIn(): boolean {
        return this.loggedInUser && this.loggedInUser.id ? true : false
    }

    @action initializeBlankUser() {
        this.loggedInUser = new User({});
    }
    @action setRedirectBackToLink(path: string) {
        this.redirectBackPath = path;
    }
};

export const loginStore = new LoginStore();
