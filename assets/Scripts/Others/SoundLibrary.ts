import { _decorator, AudioSource, Component, Node, tween, director, utils  } from 'cc';
import { MusicOperation, MusicSmoothPlay } from './MusicSmoothPlay';
const { ccclass, property } = _decorator;

export enum SFX {
    DefaultClick,
    ShapeRotate,
    ShapeAppear,
    LevelComplete
}

@ccclass('SoundLibrary')
export class SoundLibrary extends Component {

    private static _instance: SoundLibrary = null;

    public static get instance(): SoundLibrary {
        if (SoundLibrary._instance == null)
        {
            SoundLibrary._instance = director.getScene().getChildByName(SoundLibrary.name).getComponent(SoundLibrary); 
        }
        return SoundLibrary._instance;
    }

    onLoad() {
        if (SoundLibrary._instance == null)
        {
            SoundLibrary._instance = this;
        }
        else if (SoundLibrary._instance != this)
        {
            this.node.destroy();   
        }
    }

    @property({ type: MusicSmoothPlay })
    private GameMusic: MusicSmoothPlay;

    @property({ type: AudioSource })
    private DefaultClick: AudioSource;

    @property({ type: AudioSource })
    private ShapeRotate: AudioSource;

    @property({ type: AudioSource })
    private ShapeAppear: AudioSource;

    @property({ type: AudioSource })
    private LevelComplete: AudioSource;

    public playSound(soundId: SFX, volume: number = 1, delay: number = 0, loops: boolean = false) {

        // if (!GamePreferences.SoundOn) return;

        switch (soundId)
        {
            case SFX.DefaultClick:
                this.playRequestedSound(this.DefaultClick, delay, loops, volume);
                break;
            case SFX.ShapeRotate:
                this.playRequestedSound(this.ShapeRotate, delay, loops, volume);
                break;
            case SFX.ShapeAppear:
                this.playRequestedSound(this.ShapeAppear, delay, loops, volume);
                break;
            case SFX.LevelComplete:
                this.playRequestedSound(this.LevelComplete, delay, loops, volume);
                break;
        }

    }

    playRequestedSound(audio: AudioSource, delay: number, loops: boolean, volume: number)
    {
        // No pitch support.

        // if (!GamePreferences.SoundOn) return;

        if (!audio.playing)
        {
            audio.volume = volume;
            audio.loop = loops;
            tween().target(this)
            .delay(delay)
            .call(() => audio.play())
            .start();
        }
    }

    private onToggleMusic(musicOn: boolean) {
        if (musicOn)
        {
            this.playMusic();
        }
        else
        {
            this.stopMusic();
        }
    }

    public playMusic() {
        // if (!GamePreferences.MusicOn) return;

        this.GameMusic.setOperation(MusicOperation.PlaySmooth);
    }

    public pauseMusic() {
        this.GameMusic.setOperation(MusicOperation.Pause);
    }

    public resumeMusic() {
        // if (!GamePreferences.MusicOn) return;

        this.GameMusic.setOperation(MusicOperation.Resume);
    }

    public stopMusic() {
        this.GameMusic.setOperation(MusicOperation.Stop);
    }

    public fadeOutMusic() {
        this.GameMusic.setOperation(MusicOperation.FadeOut);
    }
}

