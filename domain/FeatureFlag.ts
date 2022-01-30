import { required } from './Validators'
import Email from './Email'
import Country from './Country'
import Name from './Name'
import Ratio from './Ratio'

export default class FeatureFlag {
    private _name: Name
    private _ratio: Ratio
    private _enabledEmails: Email[]
    private _includedCountries: Country[]
    private _excludedCountries: Country[]

    public static of(name: Name, ratio: Ratio, enabledEmails: Email[] = [], includedCountries: Country[] = [], excludedCountries: Country[] = []) {
        
        return new FeatureFlag(name, ratio, enabledEmails, includedCountries, excludedCountries)
    }

    private constructor(name: Name, ratio: Ratio, enabledEmails: Email[] = [], includedCountries: Country[] = [], excludedCountries: Country[] = []) {

        this._name = required(name)
        this._ratio = required(ratio)
        this._enabledEmails = enabledEmails
        this._includedCountries = includedCountries
        this._excludedCountries = excludedCountries
    }

    public get name(): Name {
        return this._name
    }

    public get ratio(): Ratio {
        return this._ratio
    }

    public get enabledEmails(): Email[] {
        // Shallow copy for immutability
        return this._enabledEmails.map(x => x)
    }

    public get includedCountries(): Country[] {
        // Shallow copy for immutability
        return this._includedCountries.map(x => x)
    }

    public get excludedCountries(): Country[] {
        // Shallow copy for immutability
        return this._excludedCountries.map(x => x)
    }

}