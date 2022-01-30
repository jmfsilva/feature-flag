import { requiredClosedRange } from './Validators'

export default class Ratio {
    private _ratio: number

    public static of(ratio: number) {

        return new Ratio(ratio)
    }

    constructor(ratio: number) {
        
        this._ratio = requiredClosedRange(ratio, 0, 1)
    }

    get value(): number {
        return this._ratio
    }
}