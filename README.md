# Notes
For the architecture use on this application i used Domain Driven Design and Hexagonal Architecture.
By using this architectures, it relays quite a lot on have strong types for all domain entities and the know its own validations so they are consistent accross uses.
For such a small project it was not necessarly required, but i wanted to produce code that is closer to production ready code that could greatly gurantee reliability.
Some interfaces currently only have one method and they could had been just a function type instead of a common interface, but it is ready for future extensions with more functionallity that would be very common for this domain, for example, CRUD of new features flags.

For unit tests i decided not extensively test all domain object and application servives because i think the most important peace of logic in the feature flag selection.

# How to install

Do the following install commands:
```npm install -g ts-node```
```npm install -g typescript```
```npm install```

# How to run
```npm run serve```

# How to test
```npm test```

# Feature flag test

Create feature flag to allow us to conduct an A/B test. Each flag document has:

```
{
    "name": "feature_foo", # Name of the feature
    "ratio": 0.5, # Percentage of users that should get the feature (50/50 in this case)
    "enabledEmails": ["bar@baz.com"], # List of emails the feature is always enabled for, regardless of other criteria
    "includedCountries": ["US"], # List of countries the user must be from, if empty it is enabled for all countries
    "excludedCountries": ["GB"], # List of countries the user must not be from
}
```

Each user has the following information:

```
{
    "email":"foo@bar.com",
    "location":"GB"
}
```

Given the list of feature flags in `features.json` , your task is to create an API endpoint that returns a list of the features that are enabled for a given user’s email and location. A list of example users are included in `example_users.json`.

# API

To check request for the list of features supported for a given user you have to do a request to the server:

```
POST /flags
{
    "email":"foo@bar.com",
    "location":"GB"
}
```

The expected result is a list of flag names of the supported features.

```
[ "feature1", "feature2" ]
```

# Test users 
If you want to test a test sample for the example users you can start the server using `npm run serve` and then on other console start `npm run test-sample`