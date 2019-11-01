// import Toast from 'vant-weapp/toast/toast'
const {regeneratorRuntime} = global
const {interceptor} = require('../../../utils/wxApi')
Page({
  data: {
    showArea: false,
    comment: '',
    toolBoxHide: false,
    scrollTop: 0,
    classify: '',
    loading: true,
    authModalShow: false,
    // nodes: [
    //   {
    //     name: 'div',
    //     attrs: {
    //       class: 'rich-text-box'
    //     },
    //     children: [
    //       {
    //         name: 'p',
    //         children: [
    //           {
    //             type: 'text',
    //             text: 'ssssssssssssssssssssssssssss'
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // ],
    strNodes: '',
    title: '定一个小目标，寿司捏到100岁',
    author: 'shishijian',
    headerIcon: ''
  },
  onLoad(q) {
    // Toast.loading()
    let _this = this
    this.setData({
      classify: q.classify
    })
    wx.request({
      url: 'http://www.chucaiguoji.com/api/news/detail?id=118',
      header: {
        'Content-Type': 'application/json;charset=UTF-8;'
      },
      method: 'post',
      success(res) {
        let resData = res.data
        let html = resData.data.content
        html = html.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block;margin: 4px 0;" ')
          .replace(/<section/g, '<div>')
          .replace(/\/section>/g, '/div>')
        _this.setData({
          strNodes: html,
          loading: false
        }, () => {
          // 数据渲染到页面后的回调
          // Toast.clear()
        })
      }
    })
  },
  onShow() {
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
  onPageScroll(opt) {
    // let _this = this
    // let currentTop = opt.scrollTop
    // let originTop = _this.data.scrollTop
    // let toolBoxHide = _this.data.toolBoxHide
    // if (!toolBoxHide && currentTop > originTop) {
    //   _this.setData({
    //     toolBoxHide: true,
    //     scrollTop: currentTop
    //   })
    // }
  },
  onResize() {

  },
  bindplayAudioTrigger(opt) {
    console.log(JSON.stringify(opt))
  },
  async bindshowCommentBoxTrigger() {
    let intercept = await interceptor()
    if (intercept === 'success') {
      this.setData({
        showArea: true
      })
    }
  },
  bindcancelCommentTrigger(opt) {
    this.setData({
      showArea: false,
      comment: opt.detail.comment
    })
  },
  bindsubmitCommentTrigger(opt) {
    let comment = opt.detail.comment
    let obj = {showArea: false}
    if (!comment) {
      obj.comment = ''
    } else {
      obj.comment = comment
    }
    this.setData(obj)
  },
  bindgetUserInfoTrigger(e) {
    this.setData({
      showArea: true
    })
  }
})