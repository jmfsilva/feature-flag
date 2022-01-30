import express from 'express'
import bodyParser from 'body-parser'
import featureFlagRouter from './drivers/FeatureFlagRounter'
import FeatureFlagFileRepositoryImpl from './adapters/FeatureFlagFileRepositoryImpl'
import FeatureFlagApplicationServiceImpl from './application/FeatureFlagApplicationServiceImpl'
import FeatureFlagSelectorServiceImpl from './domain/FeatureFlagSelectorServiceImpl'

const app = express()
app.use(bodyParser.json())
const port = 3000

const featureFlagService = new FeatureFlagApplicationServiceImpl(
    new FeatureFlagFileRepositoryImpl(),
    FeatureFlagSelectorServiceImpl.ofRandom()
)

app.use('/flags', featureFlagRouter(express.Router(), featureFlagService))

app.listen(port, () => {
  console.log(`The application is running on port ${port}.`)
})