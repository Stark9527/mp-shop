Page({
  data: {

  },
  onLoad() {

  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log('设置选中项 1')
      this.getTabBar().setData({
        selected: 1
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

  },
  bindToListPageTap(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.classify)
    wx.showToast({
      icon: 'none',
      title: '敬请期待'
    })
  }
})