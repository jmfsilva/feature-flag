import features from '../features.json'
import FeatureFlag from '../domain/FeatureFlag'
import Name from '../domain/Name'
import Ratio from '../domain/Ratio'
import Email from '../domain/Email'
import FatureFlagRepository from '../application/FeatureFlagRepository'
import Country from '../domain/Country'

const featureFlags = features.map(
    f => FeatureFlag.of(
        Name.of(f.name),
        Ratio.of(f.ratio),
        f.enabledEmails.map(email => Email.of(email)),
        f.includedCountries.map(country => Country.of(country)),
        f.excludedCountries.map(country => Country.of(country))
    )
)

export default class FeatureFlagFileRepositoryImpl implements FatureFlagRepository {
    
    async getAll(): Promise<FeatureFlag[]> {
        // FeatureFlag is immutable object, so, shallow copy is enough to avoid that this can be changed on other layers
        return featureFlags.map(x => x)
    }

}