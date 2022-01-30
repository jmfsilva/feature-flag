import * as EmailValidator from 'email-validator'

export default class Email {
    private _email: string

    public static of(email: string) {

        return new Email(email)
    }

    constructor(email: string) {

        if(!EmailValidator.validate(email)) {
            throw new Error(`Invalid email ${email}`)
        }

        this._email = email
    }

    get value(): string {
        return this._email
    }
}