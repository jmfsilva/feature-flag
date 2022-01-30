import { required } from '../domain/Validators'
import FeatureFlagRepository from "./FeatureFlagRepository"
import FeatureFlag from "../domain/FeatureFlag"
import UserInfo from "../domain/UserInfo"
import FeatureFlagApplicationService from "./FeatureFlagApplicationService"
import FeatureFlagSelectorService from "../domain/FeatureFlagSelectorService"


export default class FeatureFlagApplicationServiceImpl implements FeatureFlagApplicationService {

    private _featureFlagRepository: FeatureFlagRepository
    private _featureFlagSelectorService: FeatureFlagSelectorService

    constructor(featureFlagRepository: FeatureFlagRepository, featureFlagSelectorService: FeatureFlagSelectorService) {
        this._featureFlagRepository = required(featureFlagRepository)
        this._featureFlagSelectorService = required(featureFlagSelectorService)
    }

    async getForUser(user: UserInfo): Promise<FeatureFlag[]> {
        required(user)
        const ff = await this._featureFlagRepository.getAll()
        return ff.filter(ff => this._featureFlagSelectorService.isValid(ff, user))
    }

}