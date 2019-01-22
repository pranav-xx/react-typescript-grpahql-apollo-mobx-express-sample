export const required = (fieldValue: string, message: string = 'required') => {
    return fieldValue ? undefined : message;
}