Page({
  data: {

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
  },
  onReady() {

  },
  onHide() {

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

  }
})