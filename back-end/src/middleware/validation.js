import { AppError } from "../utils/AppError.js";

const validation = (schema) => {
    return (req, res, next) => {
        const inputData = {...req.body, ...req.params};
        const validateResult = schema.validate(inputData, {abortEarly: false});

        if(validateResult?.error){
            return next(new AppError(validateResult.error.details[0].message, 400));
        }
        next();
    }
}

export default validation;