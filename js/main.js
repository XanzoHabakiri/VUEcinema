class Videoplayer{
    constructor(selector){
        this.Player = document.querySelector(selector);
        this.video = this.Player.querySelector('.video')
        this.elements(this.Player)
        this.listeaners()
        console.dir(this.video);
        
    }
    elements(Player){
        this.PrevVideoDiv = Player.querySelector('.preveiw-video')
        this.PrevVideo = Player.querySelector('.preveiw')
        this.PrevTime = Player.querySelector('.preveiw-time')
        this.TimeLineCurrent = Player.querySelector('.panel-preweiw__line-current')
        this.TimeLineRange = Player.querySelector('.panel-preveiw__line-range')
        this.PlayBtn = Player.querySelector('.btn-arr')
        this.VolumeBtn = Player.querySelector('.btn-up')
        this.VolumeToggler = Player.querySelector('.volume')
        this.TimeCurrent = Player.querySelector('.time-current')
        this.TimeRange = Player.querySelector('.time-range')
        this.SpeedToggler = Player.querySelector('.player-speed')
        this.FullscreenBtn = Player.querySelector('.btn-scr')

    }
    listeaners(){
        const {
            video,
            PrevVideo,
            PrevTime,
            TimeLineCurrent,
            TimeLineRange,
            PlayBtn,
            VolumeBtn,
            VolumeToggler,
            TimeCurrent,
            TimeRange,
            SpeedToggler,
            FullscreenBtn 
        } = this

        video.addEventListener('click', () => this.PlayPauseVideo())
        PlayBtn.addEventListener('click', () => this.PlayPauseVideo())
        video.addEventListener('loadedmetadata', () => this.setTime())
        video.addEventListener('timeupdate', () => this.timeUpdate())
        TimeLineRange.addEventListener('mousemove', (e) => this.showPreview(e))
        TimeLineRange.addEventListener('mouseleave', () => this.hidePreview())
        TimeLineRange.addEventListener('input', () => this.setRate())
        VolumeToggler.addEventListener('input', () => this.changeVolume())
        VolumeBtn.addEventListener('click', () => this.muteVolume())
        FullscreenBtn.addEventListener('click', () => this.changeFullscreen())
        SpeedToggler.addEventListener('input', () =>this.changeSpeed())

    }
    showPreview(event){
        const {PrevVideo, PrevTime,  TimeLineRange, PrevVideoDiv} = this
        // console.dir(TimeLineRange);
        let position = event.offsetX
        let duration = TimeLineRange.offsetWidth
        let percent = Math.floor(position/duration*1000) / 1000
        // console.log(position);
        PrevVideo.currentTime = percent * PrevVideo.duration
        let minutes = Math.floor(PrevVideo.currentTime/60) < 10 ? `0${Math.floor(PrevVideo.currentTime/60)}` : Math.floor(PrevVideo.currentTime/60)
        let seconds = Math.floor(PrevVideo.currentTime%60) < 10 ? `0${Math.floor(PrevVideo.currentTime%60)}` : Math.floor(PrevVideo.currentTime%60)
        PrevTime.innerHTML = `${minutes}:${seconds}`
        PrevVideoDiv.style.display = `flex`
        if(position <= 30){
            position = 30
        }
        if(duration - position <= 50){
            position = duration - 50
        }
        PrevVideoDiv.style.left = `${position}px`
        // console.log(percent);
        
    }
    hidePreview(){
        this.PrevVideoDiv.style.display = 'none'
        this.PrevVideoDiv.removeAttribute('style')
    }
    PlayPauseVideo(){
        this.switch = !this.switch
        this.switch ? this.video.play() : this.video.pause();
        this.PlayBtn.classList.toggle('icon-play_arrow')
        this.PlayBtn.classList.toggle('icon-pause')

    }
    setTime(){
        const {video, TimeRange} = this
        let minutes = Math.floor(video.duration/60) < 10 ? `0${Math.floor(video.duration/60)}` : Math.floor(video.duration/60)
        let seconds = Math.floor(video.duration%60) < 10 ? `0${Math.floor(video.duration%60)}` : Math.floor(video.duration%60)
        TimeRange.innerHTML = `${minutes} : ${seconds}`
    }
    timeUpdate(){
        const {video, TimeCurrent, TimeLineCurrent, TimeLineRange} = this
        let minutes = Math.floor(video.currentTime/60) < 10 ? `0${Math.floor(video.currentTime/60)}` : Math.floor(video.currentTime/60)
        let seconds = Math.floor(video.currentTime%60) < 10 ? `0${Math.floor(video.currentTime%60)}` : Math.floor(video.currentTime%60)
        TimeCurrent.innerHTML = `${minutes}:${seconds}`
        let percent = Math.floor(video.currentTime/video.duration*100) / 100
        // console.log(Math.floor(percent*TimeLineRange.offsetWidth));
        
        TimeLineCurrent.style.width = `${Math.floor(percent*TimeLineRange.offsetWidth)}px`
        TimeLineRange.value = percent * 1000
    }
    setRate(){
        const {video, TimeLineCurrent, TimeLineRange} = this
        let percent = TimeLineRange.value / 10
        console.log(percent);
        
        video.currentTime = Math.floor(video.duration * percent) / 100
        TimeLineCurrent.style.width = `${percent}%`
    }
    changeVolume(){
        const {video, VolumeBtn, VolumeToggler} = this
        let value = VolumeToggler.value
        // console.log(value);
        video.muted = false
        video.volume = value / 100
        VolumeBtn.classList = ''
        VolumeBtn.classList = 'btn-up'
        value >= 50 ? VolumeBtn.classList.add('icon-volume_up') : value > 0 ? VolumeBtn.classList.add('icon-volume_down') : VolumeBtn.classList.add('icon-no_sound')
        if(value == 0)
            video.muted = true
    }
    muteVolume(){
        const {video, VolumeBtn, VolumeToggler} = this
        this.isMuted = !video.muted;
        video.muted = this.isMuted
        VolumeBtn.classList = ''
        VolumeBtn.classList = 'btn-up'
        if(video.muted){
            VolumeBtn.classList.add('icon-no_sound')
            VolumeToggler.setAttribute('volume', VolumeToggler.value)
            VolumeToggler.value = 0
        }
        else{        
            VolumeToggler.value = VolumeToggler.getAttribute('volume')
            VolumeToggler.value >= 50 ? VolumeBtn.classList.add('icon-volume_up') : VolumeBtn.classList.add('icon-volume_down')
            video.volume = VolumeToggler.value / 100
            
        }
    }
    changeFullscreen(){
        const {Player, FullscreenBtn} = this
        console.dir(Player);
        Player.isfull = !document.fullscreenElement
        Player.isfull ? Player.requestFullscreen() : document.exitFullscreen()
        FullscreenBtn.classList.toggle('icon-fullscreen')
        FullscreenBtn.classList.toggle('icon-fullscreen_exit')
    }
    changeSpeed(){
        const {SpeedToggler, video} = this
        console.dir(video);
        video.playbackRate = SpeedToggler.value
        
    }
}

 new Videoplayer('.content-container')