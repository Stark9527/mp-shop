Component({
  properties: {
    height: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: '#f7f7f7'
    },
    style: {
      type: String,
      value: ''
    },
    iconColor: {
      type: String,
      value: ''
    },
    iconActivateColor: {
      type: String,
      value: ''
    },
    stick: {
      type: Boolean,
      value: true
    },
    needDate: {
      type: Boolean,
      value: true
    },
    needComment: {
      type: Boolean,
      value: false
    },
    needFunction: {
      type: Boolean,
      value: true
    },
    date: {
      type: String,
      value: '10月20日'
    },
    functionList: {
      type: Array,
      value: [
        {className: 'iconlove', count: 8899, activate: false, hasActivateStatus: true, counted: true},
        {className: 'iconfavor', count: 110, activate: false, hasActivateStatus: true, counted: true},
        {className: 'iconshare', count: 0, activate: false, hasActivateStatus: false, counted: false}
      ]
    }
  },
  data: {

  },
  observers: {

  },
  methods: {
    bindIconTap(option) {
      console.log(option.currentTarget.dataset.icon)
      // console.log(option.target.dataset.icon) // undefined 注意target 和 currentTarget区分
      let iconClass = option.currentTarget.dataset.icon
      if (iconClass === 'iconshare') {
        console.log('分享文章')
        return false
      }
      this.data.functionList.forEach((v) => {
        if (v.hasActivateStatus && v.className === iconClass) {
          v.activate = !v.activate
        }
      })
      console.log(this.data.functionList)
      this.setData({
        functionList: [].concat(this.data.functionList)
      })
    },
    bindCommentBtnTap() {
      this.triggerEvent('showCommentBoxTrigger', {name: 'comment'}, {age: 23})
    }
  },
  lifetimes: {
    created() {

    },
    attached() {

    },
    ready() {

    },
    moved() {

    },
    detached() {

    }
  },
  options: {
    multipleSlots: true
  },
})