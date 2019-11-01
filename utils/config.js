const CURRENT_ENV = 'dev'
const PROFILES = {
  dev: {
    host: 'http://stark.ittun.com',
    option: {
      method: 'post',
      header: {
        'Content-Type': 'application/json'
      },
      data: {},
      dataType: 'json',
      responseType: 'text'
    }
  },
  test: {
    host: 'http://stark.ittun.com'
  },
  prod: {
    host: 'http://stark.ittun.com'
  }
}
const CONFIG = PROFILES[CURRENT_ENV]
module.exports = CONFIG