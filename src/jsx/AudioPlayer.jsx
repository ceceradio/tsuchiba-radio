class AudioPlayer {
    tune = null
    audio = null
    video = null
    constructor() {
        this.tune = new Audio("fmtune.mp3")
        this.tune.volume = 0.8
        this.tune.loop = true
        this.tune.preload = 'auto'
        this.tune.load()
        this.audio = new Audio()
        this.audio.volume = 0.5
        this.video = document.createElement('video')
        this.video.volume = 0.5
        
        this.audio.addEventListener('pause', this.pauseHandler)
        this.audio.addEventListener('loadstart', this.loadHandler)
        this.audio.addEventListener('playing', this.playingHandler)
        this.audio.addEventListener('error', this.errorHandler)
        this.video.addEventListener('pause', this.pauseHandler)
        this.video.addEventListener('loadstart', this.loadHandler)
        this.video.addEventListener('playing', this.playingHandler)
        this.video.addEventListener('error', this.errorHandler)
    }

    pause = () => {
        this.audio.pause();
        this.video.pause();
        this.tune.pause();
    }

    play = (url) => {
        if (this._urlIsVideo(url)) {
            this.audio && this.audio.pause()
            this._playVideo(url)
        }
        else {
            this.video && this.video.pause()
            this._playAudio(url)
        }
    }
    _playAudio(url) {
        if (typeof url === "object") {
            this.audio.src = url.url
        }
        else {
            this.audio.src = url
        }
        this.audio.play()
    }
    _playVideo(url) {
        if (typeof url === "object") {
            this.video.src = url.url
        }
        else {
            this.video.src = url
        }
        this.video.play()
    }
    _urlIsVideo(url) {
        return (typeof url === "object" && url.type==="video") || url.indexOf(".m3u8") > -1
    }

    setStaticLevel(staticLevel) {
        if (staticLevel > 0) {
            this.tune.volume = 0.8 * this.audio.volume * staticLevel
            this.tune.play()
        }
        else {
            this.tune.volume = 0
            this.tune.pause()
        }
    }

    pauseHandler = (...args) => {
        console.debug('Pause Handler')
        if (this.onPause) this.onPause.call(this, ...args)
    }

    loadHandler = (...args) => {
        console.debug('Load Handler')
        this.setStaticLevel(1)

        if (this.onLoadStart) this.onLoadStart.call(this, ...args)
    }

    playingHandler = (...args) => {
        console.debug('Playing Handler')
        this.setStaticLevel(0)

        if (this.onPlaying) this.onPlaying.call(this, ...args)
    }

    errorHandler = (...args) => {
        console.debug('Error Handler')

        if (this.onError) this.onError.call(this, ...args)
    }
}

export default AudioPlayer