export const environment = {
    aws: {
        production: true,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION
    }
}