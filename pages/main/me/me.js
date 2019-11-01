const {regeneratorRuntime} = global
const _ajax = require('../../../utils/request')
const {interceptor} = require('../../../utils/wxApi')
const app = getApp()
Page({
  data: {
    mpToken: '',
    avatar: '',
    nickName: '',
    authModalShow: false,
    functions: [
      {
        classify: 'image',
        name: '上传图片',
        icon: 'iconpicture'
      },
      {
        classify: 'video',
        name: '上传视频',
        icon: 'iconvideo'
      }
    ],
  },
  onLoad() {

  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log('设置选中项 2')
      this.getTabBar().setData({
        selected: 2
      })
    }
    let user = wx.getStorageSync('userInfo');
    if (user) {
      this.setData({
        avatar: user.avatarUrl,
        nickName: user.nickName
      })
    }
    this.setData({
      authModalShow: true
    })
  },
  onReady() {

  },
  onHide() {
    this.setData({
      authModalShow: false
    })
  },
  onUnload() {

  },
  onPullDownRefresh() {

  },
  onReachBottom() {

  },
  onShareAppMessage() {

  },
  onPageScroll() {

  },
  onResize() {

  },
  bindgetUserInfoTrigger(opt) {
    let user = wx.getStorageSync('userInfo');
    this.setData({
      avatar: user.avatarUrl,
      nickName: user.nickName
    })
  },
  async bindFuncTap(e) {
    let classify = e.currentTarget.dataset.classify
    let intercept = await interceptor()
    if (intercept === 'success') {
      wx.navigateTo({
        url: '/pages/subpages/uploader/uploader?classify=' + classify
      })
    }
  },
  onGotUserInfo(e) {
    let user = e.detail.userInfo
    if(user) {
      wx.setStorageSync('userInfo', user);
      this.setData({
        avatar: user.avatarUrl,
        nickName: user.nickName
      })
    }
    console.log(e.detail)
  }
})