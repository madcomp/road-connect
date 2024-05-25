export namespace customEasing {
    export function punch(k: number) : number {
        
        // Using LeanTween.EasePunch keyframes:
        var keyframes = [
            { time: 0.0, value: 0.0 },
            { time: 0.112586, value: 0.9976035 },
            { time: 0.3120486, value: -0.1720615 },
            { time: 0.4316337, value: 0.07030682 },
            { time: 0.5524869, value: -0.03141804 },
            { time: 0.6549395, value: 0.003909959 },
            { time: 0.770987, value: -0.009817753 },
            { time: 0.8838775, value: 0.001939224 },
            { time: 1.0, value: 0.0 }
        ];

        return customCurve(keyframes, k);
    }

    function customCurve(keyframes, k: number) : number {

        var t = Math.max(0, Math.min(1, k));
    
        // Using linear interpolation:
        for (let i = 0; i < keyframes.length - 1; i++) {
            
            const kf1 = keyframes[i];
            const kf2 = keyframes[i + 1];
            
            if (t >= kf1.time && t <= kf2.time) {
                const duration = kf2.time - kf1.time;
                const localT = (t - kf1.time) / duration;
                return kf1.value + (kf2.value - kf1.value) * localT;
            }
        }
        
        return keyframes[keyframes.length - 1].value;
    }
}
