import FeatureFlag from "../domain/FeatureFlag"
import UserInfo from "../domain/UserInfo"

export default interface FeatureFlagApplicationService {

    getForUser(user: UserInfo): Promise<FeatureFlag[]>

}