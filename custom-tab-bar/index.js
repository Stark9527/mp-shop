Component({
  data: {
    selected: 0,
    color: "#909399",
    selectedColor: "#333333",
    list: [{
      pagePath: "/pages/main/index/index",
      iconPath: "/images/star.png",
      selectedIconPath: "/images/star_active.png",
      text: "精选"
    }, {
      pagePath: "/pages/main/all/all",
      iconPath: "/images/all.png",
      selectedIconPath: "/images/all_active.png",
      text: "所有"
    },{
      pagePath: "/pages/main/me/me",
      iconPath: "/images/my.png",
      selectedIconPath: "/images/my_active.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})