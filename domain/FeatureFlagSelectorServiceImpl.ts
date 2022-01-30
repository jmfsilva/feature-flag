import { required } from './Validators'
import FeatureFlag from './FeatureFlag'
import FeatureFlagSelectorService from './FeatureFlagSelectorService'
import UserInfo from './UserInfo'

export default class FeatureFlagSelectorServiceImpl implements FeatureFlagSelectorService {

    public static ofRandom() {

        return new FeatureFlagSelectorServiceImpl(() => Math.random())
    }

    public static of(randomGenerator: () => number) {

        return new FeatureFlagSelectorServiceImpl(randomGenerator)
    }

    private _randomGenerator: () => number
    
    constructor(randomGenerator: () => number) {
        this._randomGenerator = required(randomGenerator)
    }

    isValid(flag: FeatureFlag, user: UserInfo): boolean {

        required(flag)
        required(user)

        if(flag.enabledEmails.map(it => it.value).includes(user.email.value)) {
            return true
        }

        if(flag.excludedCountries.map(it => it.value).includes(user.location.value)) {
            return false
        }

        if(flag.includedCountries.length != 0 && !flag.includedCountries.map(it => it.value).includes(user.location.value)) {
            return false
        }
        
        const result: number = this._randomGenerator()

        return result < flag.ratio.value
    }

}