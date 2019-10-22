Component({
  properties: {
    countLimit: {
      type: Number,
      value: 100
    },
    oldComment: {
      type: String,
      value: ''
    },
    focus: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: '在这里写下你想说的'
    },
    placeholderStyle: {
      type: String,
      value: 'color:#C0C4CC;'
    },
    fixed: {
      type: Boolean,
      value: true
    },
    submitText: {
      type: String,
      value: '发布'
    }
  },
  data: {
    offsetBottom: 0,
    comment: '',
    count: 0
  },
  observers: {

  },
  methods: {
    bindMaskTap() {
      this.triggerEvent('cancelCommentTrigger', {comment: this.data.comment})
    },
    bindfocus(event) {
      let keybordHei = event.detail.height
      this.setData({
        offsetBottom: keybordHei
      })
    },
    bindblur(event) {
      this.triggerEvent('cancelCommentTrigger', {comment: this.data.comment})
    },
    bindinput(event) {
      let countLimit = this.data.countLimit
      let value = event.detail.value
      this.setData({
        count: countLimit - value.length,
        comment: value
      })
    },
    bindconfirm(event) {

    },
    bindSubmitTap() {
      this.triggerEvent('submitCommentTrigger')
    }
  },
  lifetimes: {
    created() {

    },
    attached() {
      let _this = this
      _this.setData({
        count: _this.data.countLimit - _this.data.oldComment.length,
        comment: _this.data.oldComment
      })
    },
    ready() {
      // 解决ios8.0 版本微信使用autofocus不生效问题
      this.setData({
        focus: true
      })
    },
    moved() {

    },
    detached() {

    }
  },
  options: {
    multipleSlots: true
  }
})