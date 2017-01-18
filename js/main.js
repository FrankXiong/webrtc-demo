function hasUserMedia() {
  return !!(navigator.getUserMedia)
}

function isMobile() {
  const mRe = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i
  return mRe.test(navigator.userAgent)
}

let mediaCtl = {
  streaming : false,
  videoDom : document.querySelector('video'),
  canvasDom : document.querySelector('canvas'),
  getMedia: function (conf) {
    navigator.getUserMedia(conf, (stream) => {
      this.videoDom.src =  window.URL.createObjectURL(stream)
      this.streaming = true
    }, (err) => {
      console.log(err)
    })
  },
  capture: function () {
    this.canvasDom.width = this.videoDom.clientWidth * 0.3
    this.canvasDom.height = this.videoDom.clientHeight * 0.3
    let ctx = this.canvasDom.getContext('2d')
    ctx.drawImage(this.videoDom, 0, 0, this.canvasDom.width, this.canvasDom.height)
  },
  addFilter: function(filter) {
    this.canvasDom.className = filter
  },
  openMedia: function() {
    if (hasUserMedia()) {
      if (isMobile()) {
        this.getMedia(CONFIG.MOBILE, this.videoDom)
      } else {
        this.getMedia(CONFIG.COMMON, this.videoDom)
      }
    } else {
      alert('Your browser is not support `getUserMedia`')
    }
  }
};

(function() {
  const btnCapture = document.querySelector('#capture')
  const btnOpen = document.querySelector('#open')
  const btnBlur = document.querySelector('#blur')
  const btnSepia = document.querySelector('#sepia')
  const filters = ['blur', 'sepia', 'brightness', 'contrast', 'grayscale', 'invert', 'saturate', 'huerotate', 'opacity', ]

  btnOpen.addEventListener('click', (e) => {
    mediaCtl.openMedia()
    btnOpen.style.display = 'none'
  })
  btnCapture.addEventListener('click', (e) => {
    if (mediaCtl.streaming) {
      mediaCtl.capture()
    } else {
      console.log('wait a minute...')
    }
  })
  for (let i = 0; i < filters.length; i++) {
    let btnFilter = document.querySelector('#' + filters[i])
    btnFilter.addEventListener('click', (e) => {
      mediaCtl.addFilter(filters[i])
    })
  }
})()
