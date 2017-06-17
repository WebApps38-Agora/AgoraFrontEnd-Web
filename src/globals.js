class Globals {
  constructor() {
    const DEBUG = (document.location.hostname === "localhost")

    const BACKEND_URL_DEV = 'http://localhost:8000'
    const BACKEND_URL_PROD = 'https://agora-be.herokuapp.com'

    this.BACKEND_URL =
      DEBUG ? BACKEND_URL_DEV : BACKEND_URL_PROD

    const FACEBOOK_APP_ID_PROD = '1959921887623211'
    const FACEBOOK_APP_ID_DEV  = '318278021935126'

    this.FACEBOOK_APP_ID =
      DEBUG ? FACEBOOK_APP_ID_DEV : FACEBOOK_APP_ID_PROD
  }
}

export default (new Globals())
