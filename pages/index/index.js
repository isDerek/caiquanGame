var srcs = require('../data/data.js')
var srcsBuffer = srcs.srcs[0]
var winNum = 0
var userSelect = 0 //空闲态
var aiTimer
Page({
  /**
   * 页面的初始数据
   */
  data: {
    winNum: 0,
    imageAiSrc: '',
    imageAiSrcId: 3,
    imageUserSelectSrc: '',
    gameOfPlay: '',
    imageUserSelectSrcs: [],
    judgeText: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.renderHtmlTemplate();
  },
  startButtonHandle: function () {
    this.renderHtmlTemplate()
    clearInterval(aiTimer)
    this.timerGo()
    userSelect = 1
  },
  userSelectBtnHandle: function (event) {
    if(userSelect === 1){
    var userId = event.currentTarget.dataset.userid
    var aiId = event.currentTarget.dataset.aiid
    var imageUserSelectSrc = srcsBuffer.imageUserSelectSrcs[userId].src
    this.setData({
      imageUserSelectSrc: imageUserSelectSrc
    })
    clearInterval(aiTimer)
    this.judge(aiId, userId)
    userSelect = 2
    }
    else if (userSelect === 2){
      this.setData({
        judgeText: '想作弊，出两次手？大兄弟，快重新点开始',
        gameOfPlay: '无效'
      }) 
      userSelect = 0     
    }
  },
  judge: function (aiId, userId) {
    if (aiId !== 3) {
      var imageAiSrc = srcsBuffer.imageAiSrc[aiId].src
      var imageAiSrcId = srcsBuffer.imageAiSrc[aiId].id
      this.setData({
        imageAiSrcId: imageAiSrcId,
        imageAiSrc: imageAiSrc
      })
    }
    if (aiId === userId) {
      this.setData({
        judgeText: '这都平局了，大兄弟',
        gameOfPlay: '平局'
      })
    }
    else if ((aiId === 0 && userId === 1) || (aiId === 1 && userId === 2) || (aiId === 2 && userId === 0)) {
      winNum = winNum + 1
      this.setData({
        judgeText: '这都赢了，大兄弟',
        gameOfPlay: '胜利',
        winNum: winNum
      })
    }
    else if ((aiId === 0 && userId === 2) || (aiId === 1 && userId === 0) || (aiId === 2 && userId === 1)) {
      this.setData({
        judgeText: '这都输了，大兄弟',
        gameOfPlay: '失败'
      })
    }
    // else {
    //   this.setData({
    //     judgeText: '开始都没点，这么自信先出手,输了吧',
    //     gameOfPlay: '失败'
    //   })
    //   if (userId === 0) {
    //     var imageAiSrc = srcsBuffer.imageAiSrc[1].src
    //     this.setData({
    //       imageAiSrc: imageAiSrc
    //     })
    //   }
    //   else if (userId === 1) {
    //     var imageAiSrc = srcsBuffer.imageAiSrc[2].src
    //     this.setData({
    //       imageAiSrc: imageAiSrc
    //     })
    //   }
    //   else if (userId === 2) {
    //     var imageAiSrc = srcsBuffer.imageAiSrc[0].src
    //     this.setData({
    //       imageAiSrc: imageAiSrc
    //     })
    //   }
    // }
  },
  renderHtmlTemplate: function () {
    var preImageUserSelectSrc = srcsBuffer.preImageUserSrc
    var imageAiSrc = srcsBuffer.preImageAiSrc
    var imageUserSelectSrcs = srcsBuffer.imageUserSelectSrcs
    this.setData({
      imageUserSelectSrc: preImageUserSelectSrc,
      imageAiSrc: imageAiSrc,
      imageUserSelectSrcs: imageUserSelectSrcs,
      judgeText: '出拳吧，少年~',
      gameOfPlay: ''
    })
  },
  timerGo: function () {
    aiTimer = setInterval(this.aiImgChange, 100)
  },
  aiImgChange: function () {
    var randomData = Math.floor(Math.random() * 3)
    var imageAiSrc = srcsBuffer.imageAiSrc[randomData].src
    var imageAiSrcId = srcsBuffer.imageAiSrc[randomData].id
    this.setData({
      imageAiSrcId: imageAiSrcId,
      imageAiSrc: imageAiSrc
    })
  }
})