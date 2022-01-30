import { required } from './Validators'
import Email from './Email'
import Country from './Country'

export default class UserInfo {
    private _email: Email
    private _location: Country

    public static of(email: Email, location: Country) {
        
        return new UserInfo(email, location)
    }

    private constructor(email: Email, location: Country) {
        
        this._email = required(email)
        this._location = required(location)
    }

    public get email(): Email {
        return this._email
    }

    public get location(): Country {
        return this._location
    }

}