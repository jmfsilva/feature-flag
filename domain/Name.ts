import { notNullOrEmpty } from './Validators'

export default class Name {
    private _name: string

    public static of(name: string) {

        return new Name(name)
    }

    constructor(name: string) {

        this._name = notNullOrEmpty(name)
    }

    get value(): string {
        return this._name
    }
}