import { observable, computed, action } from "mobx";
import { FormField } from "./form-field.store";

export class Form {
    @observable fields: Array<FormField>;

    constructor(config: Array<{name: string, validators: Array<Function>}>) {
        this.fields = config.map(({name, validators}) => new FormField(name, validators));
    }

    @computed get hasError(): boolean {
        return this.fields.filter(field => field.hasError).length > 0;
    }

    getFieldErrors(fieldName: string): Array<string> {
        const fieldToCheck = this.fields.find(field => field.name === fieldName);
        if (!fieldToCheck) {
            throw(new Error(`${fieldName} is not a valid field name`));
        }
        return fieldToCheck.errors;
    }



    @computed get touched(): boolean {
        return this.fields.filter(field => field.touched).length > 0;
    }

    @computed get formValues(): any {
        return this.fields.reduce((acc: any, field: FormField ) => {
            acc[field.name] = field.newValue;
            return acc;
        }, {});
    }

    @action setFieldValue(name: string, value: string) {
        const fieldToUpdate = this.fields.find(field => field.name === name);
        if (!fieldToUpdate) {
            throw(new Error(`field with name ${name} does not exist`));
        }
        fieldToUpdate.setValue(value)
    }
}
