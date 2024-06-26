const withSourceMaps = require('@zeit/next-source-maps')

module.exports = withSourceMaps({
  env: {
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
      CLOUDINARY_CLOUD: process.env.CLOUDINARY_CLOUD,
      CLOUDINARY_PRESET_LOW: process.env.CLOUDINARY_PRESET_LOW,
      CLOUDINARY_PRESET_HIGH: process.env.CLOUDINARY_PRESET_HIGH,
      CLOUDINARY_FOLDER : process.env.CLOUDINARY_FOLDER,
      MERCADOPAGO_CLIENT_ID: process.env.MERCADOPAGO_CLIENT_ID,
      MERCADOPAGO_CLIENT_SECRET: process.env.MERCADOPAGO_CLIENT_SECRET,
      APP_URL: process.env.APP_URL,
      ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
      ENCRYPTION_IV: process.env.ENCRYPTION_IV,
      SECRET: process.env.SECRET,
      ENV: process.env.ENV,
      SENTRY_DSN: process.env.SENTRY_DSN,
      MANTAINER_EMAIL: process.env.MANTAINER_EMAIL,
      MANTAINER_PHONE: process.env.MANTAINER_PHONE,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://web.ferreteros.app',
        permanent: true,
        basePath: false
      },
    ]
  },
})
