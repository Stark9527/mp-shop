//app.js
const regeneratorRuntime = global.regeneratorRuntime = require("./libs/regenerator-runtime/runtime")
const {compareVersion} = require('./utils/util')
App({
  onLaunch: function () {
    const version = wx.getSystemInfoSync().SDKVersion
    console.log(`sdkversion: ${version}`)
    if (compareVersion(version, '1.3.0') < 0) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    // userInfo: null,
    checkSessionObj: {
      checked: false,
      valid: false
    },
    authObj: {}
  },
  watching(key, method) {
    console.log('监听变量：' + key);
    let obj = this.globalData;
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        console.log('setting ' + key + '  value ');
        this['_' + key] = value // 新增隐私变量，为防止栈溢出
        method(value)
      },
      get: function () {
        console.log('getting ' + key + '  value ');
        if (typeof this['_' + key] === 'undefined') { // 返回隐私变量
          return undefined
        } else {
          return this['_' + key]
        }
      }
    })
  }
})