const CONFIG = {
  COMMON: {
    video: {
      mandatory: {
        minAspectRatio: 1.333,
        maxAspectRatio: 1.778
      }
    },
    audio: false
  },
  MOBILE: {
    video: {
      mandatory: {
        minAspectRatio: 1.777,
        maxAspectRatio: 1.777,
        minWidth: 480,
        minHeight: 320,
        maxWidth: 1024,
        maxHeight: 768
      }
    },
    audio: false
  }
}
