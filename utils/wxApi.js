const {regeneratorRuntime} = global
const app = getApp()
const interceptor = async (intercept = true) => {
  try {
    if (!intercept) { // 不需要拦截
      return 'success'
    }
    // 需要拦截
    // 判断本次小程序执行过程是否已经检查过小程序登录态状态
    let checkSessionObj = app.globalData.checkSessionObj
    console.log(`sessionObj ${JSON.stringify(checkSessionObj)}`)
    let sessionValid = false
    if (checkSessionObj.checked) { // 已经check过登录态
      sessionValid = checkSessionObj.valid
    } else {
      sessionValid = await checkSession()
    }
    console.log(`sessionValid ${sessionValid}`)
    console.log(`mpToken ${wx.getStorageSync('mpToken')}`)
    if (!sessionValid || !wx.getStorageSync('mpToken')) { // 当小程序登录态或第三方mpToken失效
      // wx.showLoading({ // 授权登录整个流程为异步加载，可能出现网络卡顿
      //   title: '加载中...'
      // })
      let res = await login()
      if (res.code) {
        let authorized = await getSetting()

        if (authorized) { // 已经获取获取用户信息接口权限
          console.log(`authorized: ${authorized}`)
          let userInfo = await getUserInfo()
          let opt = {
            code: res.code,
            userInfo
          }
          let responseData = await require('../utils/request')('/login', {data: opt})
          if (responseData.statusCode === 200) {
            let mpToken = responseData.data.data.mpToken
            wx.setStorageSync('mpToken', mpToken);
            return 'success'
          } else {
            wx.showToast({
              icon: 'none',
              title: '操作失败' + responseData.errMsg
            })
            return 'fail'
          }

        } else { // 还未获取权限
          // wx.navigateTo({
          //   url: '/pages/main/login/login'
          // })
          wx.hideLoading()
          app.globalData.showAuthModal = true // 弹出授权窗口
          return 'fail'
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: '登录失败! ' + JSON.stringify(res)
        })
        return 'fail'
      }
    } else {
      return 'success'
    }
  } catch (e) {
    console.log(e)
    let str = '操作失败'
    if (!/^5\d{2}$/.test(e.statusCode)) {
      str +=  (e.errMsg ? e.errMsg + ' code:' + e.statusCode : (e.message ? ' ' + e.message : ''))
    }
    wx.showToast({
      icon: 'none',
      title: str
    })
  }
}

const checkSession = async () => {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success() {
        app.globalData.checkSessionObj.checked = true
        app.globalData.checkSessionObj.valid = true
        resolve(true)
      },
      fail() {
        app.globalData.checkSessionObj.checked = true
        app.globalData.checkSessionObj.valid = false
        resolve(false)
      }
    })
  })
}

const login = async function (timeout = 10000) {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout,
      success(res) {
        if (res.code) {
          app.globalData.checkSessionObj.valid = true
          resolve(res)
        } else {
          resolve(res.errMsg)
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

const getSetting = async function (auth = 'userInfo') {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.' + auth]) {
          resolve(true)
        } else {
          resolve(false)
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

const getUserInfo = async function () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      withCredentials: true,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

const chooseImage = async function(opt = {}) {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      sizeType: opt.sizeType || 'compressed',
      sourceType: opt.sourceType || ['album', 'camera'],
      success(res) {
        resolve(res)
      },
      fail(err) {
        if (err.errMsg.indexOf('cancel') === -1) {
          wx.showToast({
            icon: 'none',
            title: '操作失败'
          })
        }
      }
    })
  })
}

const chooseVideo = async function(opt = {}) {
  return new Promise((resolve, reject) => {
    wx.chooseVideo({
      sourceType: opt.sourceType || ['album', 'camera'],
      compressed: opt.compressed || true,
      maxDuration: opt.maxDuration || 60,
      camera: opt.camera || 'back',
      success(res) {
        resolve(res)
      },
      fail(err) {
        if (err.errMsg.indexOf('cancel') === -1) {
          wx.showToast({
            icon: 'none',
            title: '操作失败'
          })
        }
      }
    })
  })
}

const uploadFile = async function(opt = {}) {
  return new Promise((resolve, reject) => {
    console.log(opt)
    wx.uploadFile({
      url: opt.url || '',
      filePath: opt.filePath || '',
      name: opt.name || '',
      header: opt.header || {},
      formData: opt.formData || {},
      success(res) {
        console.log(res)
        if (res.statusCode === 200) {
          resolve(res)
        } else {
          if (/^5\d{2}$/.test(res.statusCode)) {
            wx.showToast({
              icon: 'none',
              title: '操作失败'
            })
          } else if(/^4\d{2}$/.test(res.statusCode)) {
            let str = res.statusCode == 413 ? '文件大于2M，请重新选择文件' : '操作失败'
            wx.showToast({
              icon: 'none',
              title: str
            })
          } else {
            reject(res)
          }
        }
      },
      fail(err) {
        console.log(`err: ${JSON.stringify(err)}`)
      }
    })
  })
}

module.exports = {
  interceptor,
  checkSession,
  login,
  getSetting,
  getUserInfo,
  chooseImage,
  chooseVideo,
  uploadFile
}