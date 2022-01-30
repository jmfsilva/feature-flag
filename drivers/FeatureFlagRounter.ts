import { Router } from 'express'
import FeatureFlagApplicationService from '../application/FeatureFlagApplicationService'
import Country from '../domain/Country'
import Email from '../domain/Email'
import UserInfo from '../domain/UserInfo'

const featureFlagRouter = (router: Router, featureFlagService: FeatureFlagApplicationService) => {
    router.post('/', async function (req, res) {
        let userInfo
        try {
            const email = Email.of(req.body.email)
            const location = Country.of(req.body.location)
            userInfo = UserInfo.of(email, location)
        } catch(error) {
            res.status(400).json({ error: error.message })
            return;
        }    
        const flags = await featureFlagService.getForUser(userInfo)
        // It is not clear if i've to return all content from the features or just the name, so, i decided to just send the name
        res.json(flags.map(f => f.name.value))
    })

    return router
}



export default featureFlagRouter