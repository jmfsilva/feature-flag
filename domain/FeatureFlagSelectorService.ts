import FeatureFlag from './FeatureFlag'
import UserInfo from './UserInfo'

export default interface FeatureFlagSelectorService {
    isValid(flag: FeatureFlag, user: UserInfo): boolean
}