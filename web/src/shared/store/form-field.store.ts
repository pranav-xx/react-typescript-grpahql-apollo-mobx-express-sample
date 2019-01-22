import { observable, computed, action } from "mobx";

export class FormField {
    @observable name: string
    @observable newValue: string;
    @observable originalValue: string;
    @observable errors: Array<string>;
    @observable touched: boolean;
    validators: Array<Function>;
    @computed get hasError() {
        return this.errors.length > 0;
    }
    constructor(name: string = '', validators: Array<Function> = [], value: string = '', errors: Array<string> = [], touched: boolean = false) {
        this.name = name;
        this.validators = validators;
        this.originalValue = value;
        this.newValue = '';
        this.errors = errors;
        this.touched = touched;
    }
    @action setValue(value: string) {
        this.touched = true;
        this.newValue = value;
        console.log(`setting ${this.name} to ${value}`);
        this.errors = [];
        this.validators.forEach(validator => {
            const error = validator.call(null, value)
            if (error) { 
                this.errors.push(error)
            }
        });
    }
    @action reset() {
        this.touched = false;
        this.newValue = this.originalValue;
        this.errors = [];
    }
    @action commit() {
        if (this.errors.length > 0) {
            throw(new Error(`can not commit field (${this.name}) value when it has errors`));
        }
        this.touched = false;
        this.originalValue = this.newValue;
    }
}
