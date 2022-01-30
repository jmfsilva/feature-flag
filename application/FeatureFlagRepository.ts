import FeatureFlag from '../domain/FeatureFlag'

export default interface FatureFlagRepository {
    getAll(): Promise<FeatureFlag[]>
}