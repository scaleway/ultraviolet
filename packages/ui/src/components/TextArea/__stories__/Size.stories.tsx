import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { TextArea } from '..'
import { Stack } from '../../Stack'

const LONG_VALUE =
  'A long time ago, in a galaxy far, far away, amidst the swirling constellations and distant star systems, there existed a realm of unimaginable wonders and ancient mysteries waiting to be discovered. This distant galaxy, filled with countless planets, moons, and celestial phenomena, was home to diverse civilizations, each with their own unique cultures, histories, and legends. Among the stars, epic tales of heroism, adventure, and conflict unfolded, shaping the destinies of countless beings and leaving an indelible mark on the fabric of the universe itself.'

export const Size: StoryFn<typeof TextArea> = () => {
  const [value, setValue] = useState(LONG_VALUE)

  return (
    <Stack gap={2}>
      <TextArea
        label="Small"
        name="example-1"
        onChange={setValue}
        value={value}
        size="small"
        placeholder="placeholder"
        clearable
      />
      <TextArea
        label="Medium"
        name="example-1"
        onChange={setValue}
        value={value}
        size="medium"
        placeholder="placeholder"
        clearable
      />
      <TextArea
        label="Large (default)"
        name="example-1"
        onChange={setValue}
        value={value}
        size="large"
        placeholder="placeholder"
        clearable
      />
    </Stack>
  )
}

Size.parameters = {
  docs: {
    description: {
      story: 'Use prop `size` to update the component size. By default, `size="large`.',
    },
  },
}
