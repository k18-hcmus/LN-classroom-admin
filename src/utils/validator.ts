import isStrongPassword from "validator/lib/isStrongPassword"
import isEmpty from "validator/lib/isEmpty"
import isLength from "validator/lib/isLength"
import isEmail from "validator/lib/isEmail"
import isInt from "validator/lib/isInt"
import isFloat from "validator/lib/isFloat"
import { createMessageInRangeError, NOT_EMAIL_ERROR_MESSAGE, NOT_EMPTY_ERROR_MESSAGE, NOT_STRONG_PASSWORD_ERROR_MESSAGE, NO_MESSAGE, ONLY_DIGIT, POINT_STRONG_ERROR_MESSAGE, STUDENT_ID_WRONG } from "../shared/messages"
import { useState } from "react"
import { STUDENT_ID_LENGTH } from "../shared/styles"
export default class InputFieldValidator {
    name: string;
    error: string;
    value: string;
    validator: any;
    initValue: string;
    setState: any
    validatorManagement: ValidatorManagement | null

    constructor(name: string, validator: any, initValue: string = "", validatorManagement: ValidatorManagement | null = null) {
        this.name = name;
        this.validator = validator
        this.value = initValue
        this.initValue = initValue
        this.error = ""
        this.setState = null
        this.validatorManagement = validatorManagement
        this.validatorManagement && this.validatorManagement.create(this)
    }

    setSetStateCallback(callback: any) {
        this.setState = callback
    }

    hasError() {
        return this.error.length > 0
    }

    validate() {
        const clone = this.clone()
        clone.error = clone.validator ? clone.validator(clone.value) : NO_MESSAGE
        clone.runSetState(this)
    }

    runSetState(origin: InputFieldValidator) {
        this.setState(this)
    }

    handleOnChange(value: string) {
        const clone = this.clone()

        clone.value = value
        clone.error = clone.validator ? clone.validator(clone.value) : NO_MESSAGE
        clone.runSetState(this)
    }

    setError(error: string) {
        const clone = this.clone()
        clone.error = error
        clone.runSetState(this)
    }

    reset() {
        const clone = this.clone()
        clone.error = ""
        clone.value = this.initValue
        clone.runSetState(this)
    }

    clone() {
        const clone = new InputFieldValidator(this.name, this.validator, this.initValue, this.validatorManagement)
        clone.value = this.value
        clone.error = this.error
        clone.setSetStateCallback(this.setState)
        return clone
    }
}

export const useValidator = (name: string, validator: any, initValue: string = "", validatorManagement: ValidatorManagement | null = null) => {
    const [field, setFields] = useState(() => new InputFieldValidator(name, validator, initValue, validatorManagement))
    field.setSetStateCallback(setFields)
    return field
}

export class ValidatorManagement {
    listValidator: InputFieldValidator[]

    constructor() {
        this.listValidator = []
    }


    create = (concreteValidator: InputFieldValidator) => {

        const removedOldValidatorList = this.listValidator.filter((validator) => validator.name !== concreteValidator.name)
        this.listValidator = [...removedOldValidatorList, concreteValidator]
    }

    hasError = () => {
        for (let i = 0; i < this.listValidator.length; ++i) {
            if (this.listValidator[i].hasError()) {
                return true
            }
        }
        return false
    }

    reset = () => {
        this.listValidator.forEach((validator) => validator.reset())
    }

    handleOnChange = (validator: InputFieldValidator) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            validator.handleOnChange(event.target.value)
        }

    validate = () => {
        this.listValidator.forEach((validator) => validator.validate())
    }

    getValuesObject = () => {
        interface ValuesObject {
            [key: string]: string
        }

        const reduceFunction = (previousValue: ValuesObject, validator: InputFieldValidator) => {
            previousValue[validator.name] = validator.value
            return previousValue
        }
        return this.listValidator.reduce(reduceFunction, {})
    }
}



export const useValidatorManagement = () => {
    const [manager] = useState(() => new ValidatorManagement())

    return manager
}

const usernameMinLength = 6

export const passwordValidation = (password: string) => {
    if (isStrongPassword(password)) {
        return NO_MESSAGE
    }
    return NOT_STRONG_PASSWORD_ERROR_MESSAGE
}

export const usernameValidation = (username: string) => {
    if (isLength(username, { min: usernameMinLength })) {
        return NO_MESSAGE
    }
    return createMessageInRangeError(usernameMinLength)
}

export const emailValidation = (email: string) => {
    if (isEmail(email)) {
        return NO_MESSAGE
    }
    return NOT_EMAIL_ERROR_MESSAGE
}

export const notEmptyValidation = (stringToValidate: string) => {
    if (!isEmpty(stringToValidate)) {
        return NO_MESSAGE
    }
    return NOT_EMPTY_ERROR_MESSAGE
}

export const studentIdValidation = (stringToValidate: string) => {
    if (isInt(stringToValidate) && stringToValidate.length === STUDENT_ID_LENGTH) {
        return NO_MESSAGE
    }
    return STUDENT_ID_WRONG
}

export const onlyNumberValidation = (stringToValidate: string) => {
    if (isFloat(stringToValidate)) {
        return NO_MESSAGE
    }
    return ONLY_DIGIT
}

export const pointValidation = (stringToValidate: string) => {
    if (isFloat(stringToValidate)) {
        if (isFloat(stringToValidate,{min:0.0,max:10.0}))
        return NO_MESSAGE
        else return POINT_STRONG_ERROR_MESSAGE
    }
    return ONLY_DIGIT
}