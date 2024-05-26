# Road Connect

This project objective is to present a Cocos Creator version of the original Unity game **Road Connect**.
```
Unity 2019.2.17f1 => Cocos Creator 3.7.2
```
## Architecture overview
One of the key points was to try to preserve the original naming, classes and patterns already being used in the Unity project. This way it is easier to compare changes and translate future updates in the original game version. Also I believe it is simpler to evaluate the exercise results for Infinity Games interviewer.

However, despite keeping most of classes and visual components original format, we have some differences:

1. Cocos puzzle pieces are now UI components (Sprite-based nodes) instead of gameplay gameObjects in Unity (SpriteRenderer-based).
2. Game settings (for SFX and Music) had code implementation in Unity but no visibility for the player, so it was removed in Cocos version.
3. Animation, LeanTween and Coroutine based logic in Unity were replaced by tween / scheduler in Cocos.
4. Fixed a minor bug in Unity where the level number text was mismatching between the level select button and the level title.
5. Added support to landscape mode.
6. Replaced `LevelCreatorData` scriptableObject by prefab + json in Cocos.
7. Unfortunately I didn't add a level editor to the Cocos version - sorry, I got out of time, a solid solution here could be a Cocos extension.
8. Added 3 more levels.

## Unity version bugs

The original Unity game has a solid and straighforward implementation, with not many bugs. Some of them were addressed above, but here is the full list:

1. No support to landscape mode (depending on the aspect ratio the game become unusable)
2. Minor mismatch between level number in level select button and the level title.
3. Minor UI hiccup: level select button pressed sprite does not offset down the level text, as expected.
4. PuzzlePiece ROTATION_SPEED is used as rotation duration. I considered it as a duration too in the Cocos version.
