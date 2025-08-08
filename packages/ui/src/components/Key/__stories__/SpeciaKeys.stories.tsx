import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { KEYS_MATCH, Key } from '..'

export const SpecialKeys: StoryFn<typeof Key> = props => (
  <Stack gap={1}>
    {Object.keys(KEYS_MATCH).map(element => (
      <Stack direction="row" gap="0.5" key={element}>
        {element}:<Key {...props}>{element}</Key>
      </Stack>
    ))}
  </Stack>
)

SpecialKeys.args = {
  disabled: false,
  prominence: 'default',
  sentiment: 'neutral',
  size: 'medium',
}

SpecialKeys.parameters = {
  docs: {
    description: {
      story: `Some text will generate special keys.`,
    },
  },
}
