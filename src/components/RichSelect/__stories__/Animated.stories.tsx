import { ComponentStory } from '@storybook/react'
import { useState } from 'react'
import RichSelect, { SelectOption } from '..'
import { Button } from '../..'
import * as animations from '../../../utils/animations'

export const Animated: ComponentStory<typeof RichSelect> = ({ ...props }) => {
  const [value, setValue] = useState<string>('pulse')

  const [options] = useState(
    Object.keys(animations).map(animation => ({
      label: animation,
      value: animation,
    })),
  )

  const handleChange = (newValue: SelectOption) => {
    if (newValue?.value) {
      setValue(newValue.value)
    }
  }

  return (
    <>
      <Button onClick={() => setValue('pulse')}>Select pulse animation</Button>
      <RichSelect
        name="animated"
        animationOnChange
        animation={value}
        animationDuration={1000}
        value={value}
        // @ts-expect-error onChange signature error because RichSelect did not properly implement IsMulti
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
    storyDescription: `THis shows how to use \`animationOnChange\`, \`animation\` and \`animationDuration\` on RichSelect.
The animation will be played when the value changes. Animation start when you select new value but also if you change the value of RichSelect with an external way (check example with button).

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
