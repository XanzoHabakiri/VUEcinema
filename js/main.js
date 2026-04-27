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
    }
    showPreview(event){
        const {PrevVideo, PrevTime, TimeLineCurrent, TimeLineRange, PrevVideoDiv} = this
        console.dir(TimeLineRange);
        let position = event.offsetX
        let duration = TimeLineRange.offsetWidth
        let percent = Math.round(position/duration*1000) / 1000
        console.log(position);
        PrevVideo.currentTime = percent * PrevVideo.duration
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
        const {video, TimeCurrent} = this
        let minutes = Math.floor(video.currentTime/60) < 10 ? `0${Math.floor(video.currentTime/60)}` : Math.floor(video.currentTime/60)
        let seconds = Math.floor(video.currentTime%60) < 10 ? `0${Math.floor(video.currentTime%60)}` : Math.floor(video.currentTime%60)
        TimeCurrent.innerHTML = `${minutes}:${seconds}`
    }
}

 new Videoplayer('.content-container')