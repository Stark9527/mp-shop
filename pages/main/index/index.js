//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loaded: false,
    featureList: [
      {
        id: 0,
        classify: '阅读',
        title: '这里是一个标题',
        author: '作者XXX',
        imgSrc: 'http://cczbfile.ccvzb.com//gcrcsUploadFile/2018/5/17/185217/1526554337758.jpg',
        brief: '这里是文章简介',
        date: '2019-10-14 11:59:11',
        icon: {
          favor: true,
          share: true
        }
      },
      {
        id: 1,
        classify: '音乐',
        title: '这里是asjdflajdfl;标题',
        author: '作者ssj',
        imgSrc: 'http://cczbfile.ccvzb.com//gcrcsUploadFile/2018/5/17/18512/1526554262156.jpg',
        brief: '这里是另外一个文件的简介',
        date: '2019-10-10 10:19:21',
        icon: {
          favor: false,
          share: true
        }
      }
    ]
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log('设置选中项 0')
      this.getTabBar().setData({
        selected: 0
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
    setTimeout(() => {
      let newList = [
        {
          id: Number((Math.random() * 10).toFixed(3)) * 1000,
          classify: '阅读',
          title: '这里是asjdflajdfl;标题',
          author: '作者ssj',
          imgSrc: 'http://cczbfile.ccvzb.com//gcrcsUploadFile/2018/5/17/18512/1526554262156.jpg',
          brief: '这里是另外一个文件的简介',
          date: '2019-10-10 10:19:21',
          icon: {
            favor: false,
            share: true
          }
        },
        {
          id: Number((Math.random() * 10).toFixed(3)) * 1000,
          classify: '阅读',
          title: '这里是一个标题',
          author: '作者XXX',
          imgSrc: 'http://cczbfile.ccvzb.com//gcrcsUploadFile/2018/5/17/185217/1526554337758.jpg',
          brief: '这里是文章简介',
          date: '2019-10-14 11:59:11',
          icon: {
            favor: true,
            share: true
          }
        },
        {
          id: Number((Math.random() * 10).toFixed(3)) * 1000,
          classify: '音乐',
          title: '这里是一个标题',
          author: '作者XXX',
          imgSrc: 'http://cczbfile.ccvzb.com//gcrcsUploadFile/2018/5/17/185217/1526554337758.jpg',
          brief: '这里是文章简介',
          date: '2019-10-14 11:59:11',
          icon: {
            favor: true,
            share: false
          }
        }
      ]
      this.setData({
        featureList: newList
      })
      this.setData({
        loaded: false
      })
      wx.stopPullDownRefresh()
    }, 1000)
  },
  onReachBottom: function () {
    let newList = [
      {
        id: Number((Math.random() * 10).toFixed(3)) * 1000,
        classify: '阅读',
        title: '这里是asjdflajdfl;标题',
        author: '作者ssj',
        imgSrc: 'http://cczbfile.ccvzb.com//gcrcsUploadFile/2018/5/17/18512/1526554262156.jpg',
        brief: '这里是另外一个文件的简介',
        date: '2019-10-10 10:19:21',
        icon: {
          favor: false,
          share: true
        }
      },
      {
        id: Number((Math.random() * 10).toFixed(3)) * 1000,
        classify: '视频',
        title: '这里是一个标题',
        author: '作者XXX',
        imgSrc: 'http://cczbfile.ccvzb.com//gcrcsUploadFile/2018/5/17/185217/1526554337758.jpg',
        brief: '这里是文章简介',
        date: '2019-10-14 11:59:11',
        icon: {
          favor: true,
          share: true
        }
      },
      {
        id: Number((Math.random() * 10).toFixed(3)) * 1000,
        classify: '音乐',
        title: '这里是一个标题',
        author: '作者XXX',
        imgSrc: 'http://cczbfile.ccvzb.com//gcrcsUploadFile/2018/5/17/185217/1526554337758.jpg',
        brief: '这里是文章简介',
        date: '2019-10-14 11:59:11',
        icon: {
          favor: true,
          share: false
        }
      },
      {
        id: Number((Math.random() * 10).toFixed(3)) * 1000,
        classify: '音乐',
        title: '这里是一个标题',
        author: '作者XXX',
        imgSrc: 'http://cczbfile.ccvzb.com//gcrcsUploadFile/2018/5/17/185217/1526554337758.jpg',
        brief: '这里是文章简介',
        date: '2019-10-14 11:59:11',
        icon: {
          favor: true,
          share: false
        }
      }
    ]
    let featureList = [].concat(this.data.featureList, newList)
    setTimeout(() => {
      if (featureList.length > 20) {
        this.setData({loaded: true})
      } else {
        this.setData({featureList: featureList})
      }
    }, 360)
    console.log('页面滑动到底部了')
  },
  onShareAppMessage() {

  },
  onPageScroll() {

  },
  onResize() {

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
