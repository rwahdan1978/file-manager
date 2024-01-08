import { environment1 } from '../environments/environment';

let env = environment1

export const environment = {
    aws: {
        production: true,
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
        region: 'ap-south-1'
    }
}