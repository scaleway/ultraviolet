---
"@ultraviolet/ui": major
---

**BREAKING CHANGE** Remove all emotion animation, replace with vanilla-extract animation by default. To use the Emotion animation, add `Emotion` to the name of the animation: 
```js
import { fadeIn } from '@ultraviolet/ui' // vanilla-extract animation
import { fadeInEmotion } from '@ultraviolet/ui' // Emotion animation
```
