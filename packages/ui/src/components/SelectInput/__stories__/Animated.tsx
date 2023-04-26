import type { ComponentStory } from '@storybook/react'
import { useState } from 'react'
import type { SingleValue } from 'react-select'
import { SelectInput } from '..'
import { Button } from '../..'
import * as animations from '../../../utils/animations'

type OptionType = { label: string; value: string }

export const Animated: ComponentStory<typeof SelectInput> = ({ ...props }) => {
  const [options] = useState(
    Object.keys(animations).map(animation => ({
      label: animation,
      value: animation,
    })),
  )
  const defaultOption = { value: 'pulse', label: 'pulse' }
  const [animation, setAnimation] = useState<OptionType>(defaultOption)

  const handleChange = (newValue: SingleValue<OptionType>) => {
    if (newValue) {
      setAnimation(newValue)
    }
  }

  return (
    <>
      <Button onClick={() => setAnimation(defaultOption)}>
        Select pulse animation
      </Button>
      <SelectInput
        name="animated"
        animationOnChange
        animation={animation.value}
        animationDuration={1000}
        value={animation}
        // @ts-expect-error onChange signature error because SelectInput did not properly implement IsMulti
        onChange={handleChange}
        isMulti={false}
        options={options}
        {...props}
      />
    </>
  )
}

Animated.parameters = {
  docs: {
    storyDescription: `THis shows how to use \`animationOnChange\`, \`animation\` and \`animationDuration\` on SelectInput.
The animation will be played when the value changes. Animation start when you select new value but also if you change the value of SelectInput with an external way (check example with button).

#### Available animations

${Object.keys(animations)
  .map(animation => `\`${animation}\``)
  .join(' ')}`,
  },
}

Animated.decorators = [
  StoryComponent => (
    <div
      style={{
        margin: '16px 64px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      <StoryComponent />
    </div>
  ),
]
