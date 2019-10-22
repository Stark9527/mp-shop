Page({
  data: {
    showArea: false,
    comment: ''
  },
  onLoad() {

  },
  onShow() {

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
  bindplayAudioTrigger(opt) {
    console.log(JSON.stringify(opt))
  },
  bindshowCommentBoxTrigger() {
    this.setData({
      showArea: true
    })
  },
  bindcancelCommentTrigger(opt) {
    this.setData({
      showArea: false,
      comment: opt.detail.comment
    })
  },
  bindsubmitCommentTrigger() {
    this.setData({
      showArea: false,
      comment: ''
    })
  }
})