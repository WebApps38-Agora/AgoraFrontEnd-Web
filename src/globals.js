class Globals {
  constructor() {
    this.BACKEND_URL_DEV = 'http://localhost:8000'
    this.BACKEND_URL_PROD = 'https://agora-be.herokuapp.com'
    this.BACKEND_URL = this.BACKEND_URL_PROD
  }
}

export default (new Globals())
