import countries from 'country-data'

export default class Country {
    private _country: string

    public static of(country: string) {

        return new Country(country)
    }

    private constructor(country: string) {

        if(countries.lookup.countries({alpha2: country}).length == 0) {
            throw new Error(`Invalid country code ${country}`)
        }

        this._country = country
    }

    get value(): string {
        return this._country
    }
}