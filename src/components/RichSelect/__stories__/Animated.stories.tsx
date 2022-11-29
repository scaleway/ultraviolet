import { ComponentStory } from '@storybook/react'
import { useState } from 'react'
import RichSelect, { SelectOption } from '..'
import { Button } from '../..'
import ControlValue from '../../../__stories__/components/ControlValue'
import * as animations from '../../../utils/animations'

// @fixme this looks like 💩on code snippet
export const Animated: ComponentStory<typeof RichSelect> = ({ ...props }) => (
  <ControlValue<SelectOption> value={{ label: '', value: '' }}>
    {({ value, onChange }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [options] = useState(
        Object.keys(animations).map(animation => ({
          label: animation,
          value: animation,
        })),
      )

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Button onClick={() => onChange({ label: 'pulse', value: 'pulse' })}>
            Select pulse animation
          </Button>
          <RichSelect
            name="animated"
            animationOnChange
            animation={value.value}
            animationDuration={1000}
            value={value}
            onChange={onChange}
            options={options}
            {...props}
          />
        </div>
      )
    }}
  </ControlValue>
)

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
    <div style={{ margin: '16px 64px' }}>
      <StoryComponent />
    </div>
  ),
]
