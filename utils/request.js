const {regeneratorRuntime} = global
const {interceptor} = require('../utils/wxApi')
const {host, option} = require('./config')
const app = getApp()

const _ajax = async function (link = '', opt = {}) {
  return new Promise( async (resolve, reject) => {
    if (link.indexOf('login') === -1) {
      let interceptResponse = await interceptor(opt.intercept)
      // wx.hideLoading() // 拦截完成关闭loading
      if (interceptResponse !== 'success') {
        return false
      }
    }
    let url = link.indexOf('/') !== 0 ? host + '/' + link : host + link
    let header = opt.header || option.header
    let method = opt.method || option.method
    let data = opt.data || {}

    Object.assign(data, {
      mpToken: wx.getStorageSync('mpToken')
    })

    if (opt.showLoading) {
      wx.showLoading({
        title: '加载中...'
      })
    }

    console.log(`request obj==============================>\nurl: ${url}\nheader: ${JSON.stringify(header)}\nmethod: ${method}\ndata: ${JSON.stringify(data)}`)
    wx.request({
      url,
      header,
      method,
      data,
      success(res) {
        console.log(`response obj==============================>\n${JSON.stringify(res)}`)
        if (res.statusCode === 200) {
          if (res.data.status === 5) {
            wx.setStorageSync('mpToken', '');
            app.globalData.authObj.title = 'Token过期'
            app.globalData.authObj.content = '重新获取Token,点击确认或取消按钮都可以哦~'
            app.globalData.showAuthModal = true
          }
          resolve(res)
        } else {
          setTimeout(() => { // 使用异步方式解决showToast因hideLoading一闪而过的问题
            if (/^5\d{2}$/.test(res.statusCode)) {
              wx.showToast({
                icon: 'none',
                title: '操作失败'
              })
            } else if(/^4\d{2}$/.test(res.statusCode)) {
              wx.showToast({
                icon: 'none',
                title: '操作失败'
              })
            } else {
              reject(res)
            }
          }, 30)
        }
      },
      fail(err) {
        reject(err)
      },
      complete() {
        if (opt.showLoading) {
          wx.hideLoading()
        }
      }
    })
  })

}

module.exports = _ajax