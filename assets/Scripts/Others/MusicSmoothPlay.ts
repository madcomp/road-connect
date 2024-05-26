import { _decorator, AudioClip, AudioSource, CCFloat, Component, Node, Tween, tween } from 'cc';
const { ccclass, property } = _decorator;

export enum MusicOperation {
    PlaySmooth,
    Stop,
    Pause,
    Resume,
    FadeOut,
    Play
}

@ccclass('MusicSmoothPlay')
export class MusicSmoothPlay extends Component {

    private static readonly INCREMENT_DELAY: number = 0.5;

    @property({ type: CCFloat })
    private TargetVolume: number;

    @property({ type: CCFloat })
    private InitialVolume: number;

    @property({ type: CCFloat })
    private IncreaseStep: number;

    @property({ type: AudioSource })
    private Music: AudioSource;

    private changeVolume: () => void = null;

    fadeOut() {
        if (this.Music.playing)
        {
            this.decreaseVolume();
        }
    }

    decreaseVolume() {

        var self = this;
        self.stopChangingVolume();
        self.changeVolume = () =>
        {
            self.Music.volume -= self.IncreaseStep;
            if (self.Music.volume <= 0)
            {
                self.stopChangingVolume();
                self.Music.volume = 0;
                self.Music.stop();
            }
        };
        self.schedule(self.changeVolume, MusicSmoothPlay.INCREMENT_DELAY);
    }

    increaseVolume(targetVolume: number) {
        var self = this;
        self.stopChangingVolume();
        self.changeVolume = () =>
        {
            self.Music.volume += self.IncreaseStep;
            if (self.Music.volume >= targetVolume)
            {
                self.stopChangingVolume();
                self.Music.volume = targetVolume;
            }
        };
        self.schedule(self.changeVolume, MusicSmoothPlay.INCREMENT_DELAY);
    }

    resumePlayback() {
        this.Music.play();
    }

    pausePlayback() {
        this.Music.pause();
    }

    stopPlayback() {
        this.stopChangingVolume();
        this.Music.stop();
    }

    stopChangingVolume() {
        if (this.changeVolume != null)
        {
            this.unschedule(this.changeVolume);
            this.changeVolume = null;   
        }
    }

    playMusicFromInitialVolume()
    {
        if (!this.Music.playing)
        {
            this.Music.volume = this.InitialVolume;
            this.Music.play();
            this.increaseVolume(this.TargetVolume);
        }
    }

    public setNewAudio(newAudio: AudioClip)
    {
        this.Music.clip = newAudio;
    }

    public setOperation(operation: MusicOperation)
    {
        switch (operation)
        {
            case MusicOperation.PlaySmooth:
                this.playMusicFromInitialVolume();
                break;
            case MusicOperation.Stop:
                this.stopPlayback();
                break;
            case MusicOperation.FadeOut:
                this.fadeOut();
                break;
            case MusicOperation.Pause:
                this.pausePlayback();
                break;
            case MusicOperation.Resume:
                this.resumePlayback();
                break;

        }
    }
}

