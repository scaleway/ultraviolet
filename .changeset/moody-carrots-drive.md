---
"@ultraviolet/ui": major
---

**BREAKING CHANGE** Remove all emotion animation, replace with vanilla-extract animation by default.
```js
import { fadeIn } from '@ultraviolet/ui' // vanilla-extract animation
```

To use animation in another context, add `Default` at the end of the animation name:
```js
import { fadeInDefault } from "@ultraviolet/ui"
````
This returns a string that can be used in many different places.
1. **Emotion**: create the keyframe then use it: 
```js 
import { fadeInDefault } from "@ultraviolet/ui"
import { keyframes } from '@emotion/react'

const fadeInEmotion = keyframes`${fadeInDefault}`
const StyledDiv = styled.div`
animation: ${fadeInEmotion} 1s ease infinite;`
```

2. Vanilla CSS: simply add the name of the animation you want to use as a className. 
```js
const MyComponent = () => <div className="fadeIn">Hello World!</div>
```

To customize the animation, you must overrule the default settings: 
```js
const MyComponent = () => <div className="fadeIn" style={{ animationDuration: "300ms" }}>Hello World!</div>
```
