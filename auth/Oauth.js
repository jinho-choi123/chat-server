import qs from 'qs';
import 'dotenv/config'

const queryStr = qs.stringify({
    client_id: process.env.GOOGLE_OAUTH_CLIENTID,
    
})