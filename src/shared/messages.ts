export const ERROR_MESSAGE = 'Unexpected Error!'
export const NO_MESSAGE = ""
export const NOT_EMPTY_ERROR_MESSAGE = "This field cannot be empty!"
export const NOT_STRONG_PASSWORD_ERROR_MESSAGE = "Password must contains lowercase, uppercase, number, symbols and at least 8 characters length!"
export const NOT_EMAIL_ERROR_MESSAGE = "Invalid email! Please input a valid one!"
export const LOGIN_FAILED = "Username or password is incorrect!"
export const STUDENT_ID_WRONG = "Student Id must only contain number and have exact 8 characters!"
export const ONLY_DIGIT = "This field must only contain number!"
export const POINT_STRONG_ERROR_MESSAGE = "Point must be from 0 to 10!"


export const createMessageInRangeError = (min?: number, max?: number) => {
    if (!min && !max)
        return NO_MESSAGE

    if (min) {
        if (max) {
            return `The number of characters must be between ${min}-${max}!`
        }
        return `The number of characters must be at least ${min}!`
    }

    return `The number of characters must be no more than ${max}!`
}