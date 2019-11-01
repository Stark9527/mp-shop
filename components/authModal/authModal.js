const app = getApp()
Component({
  properties: { // 模板属性对象
    title: {
      type: Boolean,
      value: true
    },
    show: {
      type: Boolean,
      value: false
    },
    titleText: {
      type: String,
      value: '标题'
    },
    custom: {
      type: Boolean,
      value: false
    },
    content: {
      type: String,
      value: '这是内容'
    },
    cancelBtnText: {
      type: String,
      value: '取消'
    },
    confirmBtnText: {
      type: String,
      value: '确认'
    }
  },
  data: { // 私有数据

  },
  observers: {},
  methods: { // 组件方法
    onGotUserInfo(e) {
      this.setData({
        show: false
      })
      if(e.detail.userInfo) {
        wx.setStorageSync('userInfo', e.detail.userInfo);
        this.triggerEvent('getUserInfoTrigger', {data: e.detail})
      }
    },
    cancel() {
      this.setData({
        show: false
      })
    }
  },
  lifetimes: { // 组件生命周期，可以写在lifetimes对象里，也可以单独写在methods对象里
    created() {

    },
    attached() {
      let _this = this
      app.watching('showAuthModal', (v) => {
        console.log('changed value: ' + v)
        let globalTile = app.globalData.authObj.title
        let globalContent = app.globalData.authObj.content
        console.log(globalContent)
        console.log(`authObj: ${JSON.stringify(app.globalData.authObj)}`)
        if (globalTile) {
          this.setData({
            titleText: globalTile
          })
        }
        if (globalContent) {
          this.setData({
            content: globalContent
          })
        }
        _this.setData({
          show: v
        })
      })
    },
    ready() {

    },
    moved() {

    },
    detached() {

    }
  },
  pageLifetimes: { // 组件所在页面的生命周期
    show() {

    },
    hide() {

    },
    resize() {

    }
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  }
})