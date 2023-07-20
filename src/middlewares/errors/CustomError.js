export default class CustomError {
    static createError({ name = "Error", cause, message, code = 1 }) {
        let error = new Error(message, { cause });
        error.name = name;
        error.code = code;
        return error;
    }
}

/* EJEMPLO
    if (!first_name || !last_name || !email){
        throw CustomError.createError({
            name: 'UserError',
            cause: generateUserErrorInfo({
                first_name,
                last_name,
                email
            }),
            message: 'Error trying to create user',
            code: EErrors.INVALID_TYPE_ERROR
        })
    }*/

    