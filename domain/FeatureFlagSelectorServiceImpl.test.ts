import Country from './Country';
import Email from './Email';
import FeatureFlag from './FeatureFlag';
import FeatureFlagSelectorServiceImpl from './FeatureFlagSelectorServiceImpl'
import Name from './Name';
import Ratio from './Ratio';
import UserInfo from './UserInfo';

const service = FeatureFlagSelectorServiceImpl.of(() => 0.5)

test('required random function expect exception', () => {

    expect(() => FeatureFlagSelectorServiceImpl.of(undefined)).toThrowError();
});

test('flag required expect exception', () => {

    const uInfo = UserInfo.of(Email.of("j@test.com"), Country.of("GB"));

    expect(() => service.isValid(undefined, uInfo)).toThrowError();
});

test('user info required expect exception', () => {

    const ff = FeatureFlag.of(Name.of("Joaquim"), Ratio.of(0.2));

    expect(() => service.isValid(ff, undefined)).toThrowError();
});

test('only name and ratio bellow the random value', () => {

    const ff = FeatureFlag.of(Name.of("Joaquim"), Ratio.of(0.2));
    const uInfo = UserInfo.of(Email.of("j@test.com"), Country.of("GB"));

    expect(service.isValid(ff, uInfo)).toBe(false);
});

test('only name and ratio above the random value', () => {

    const ff = FeatureFlag.of(Name.of("Joaquim"), Ratio.of(0.6));
    const uInfo = UserInfo.of(Email.of("j@test.com"), Country.of("GB"));

    expect(service.isValid(ff, uInfo)).toBe(true);
});

test('email on include list expect true', () => {

    const ff = FeatureFlag.of(Name.of("Joaquim"), Ratio.of(0.2), [Email.of("j@test.com")]);
    const uInfo = UserInfo.of(Email.of("j@test.com"), Country.of("GB"));

    expect(service.isValid(ff, uInfo)).toBe(true);
});

test('email not on include list expect false', () => {

    const ff = FeatureFlag.of(Name.of("Joaquim"), Ratio.of(0.2), [Email.of("j2@test.com")]);
    const uInfo = UserInfo.of(Email.of("j@test.com"), Country.of("GB"));

    expect(service.isValid(ff, uInfo)).toBe(false);
});

test('excluded country expect false', () => {

    const ff = FeatureFlag.of(Name.of("Joaquim"), Ratio.of(0.6), [], [], [Country.of("GB")]);
    const uInfo = UserInfo.of(Email.of("j@test.com"), Country.of("GB"));

    expect(service.isValid(ff, uInfo)).toBe(false);
});

test('included contains country expect true', () => {

    const ff = FeatureFlag.of(Name.of("Joaquim"), Ratio.of(0.6), [], [Country.of("GB")], []);
    const uInfo = UserInfo.of(Email.of("j@test.com"), Country.of("GB"));

    expect(service.isValid(ff, uInfo)).toBe(true);
});

test('included contains country, ratio not enough expect false', () => {

    const ff = FeatureFlag.of(Name.of("Joaquim"), Ratio.of(0.2), [], [Country.of("GB")], []);
    const uInfo = UserInfo.of(Email.of("j@test.com"), Country.of("GB"));

    expect(service.isValid(ff, uInfo)).toBe(false);
});

test('included does not contain country, ratio enough expect false', () => {

    const ff = FeatureFlag.of(Name.of("Joaquim"), Ratio.of(0.6), [], [Country.of("PT")], []);
    const uInfo = UserInfo.of(Email.of("j@test.com"), Country.of("GB"));

    expect(service.isValid(ff, uInfo)).toBe(false);
});