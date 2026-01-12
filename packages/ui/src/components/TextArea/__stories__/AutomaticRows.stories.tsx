import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { TextArea } from '..'

const LONG_VALUE =
  'A long time ago, in a galaxy far, far away, amidst the swirling constellations and distant star systems, there existed a realm of unimaginable wonders and ancient mysteries waiting to be discovered. This distant galaxy, filled with countless planets, moons, and celestial phenomena, was home to diverse civilizations, each with their own unique cultures, histories, and legends. Among the stars, epic tales of heroism, adventure, and conflict unfolded, shaping the destinies of countless beings and leaving an indelible mark on the fabric of the universe itself.'
const SHORT_VALUE = 'A long time ago in a galaxy far, far away'

export const AutomaticRows: StoryFn<typeof TextArea> = () => {
  const [value1, setValue1] = useState(LONG_VALUE)
  const [value2, setValue2] = useState(LONG_VALUE)
  const [value3, setValue3] = useState(SHORT_VALUE)
  const [value4, setValue4] = useState(SHORT_VALUE)
  const [value5, setValue5] = useState(SHORT_VALUE)

  return (
    <Stack gap={2}>
      <TextArea
        aria-label={undefined}
        label="Rows=auto"
        name="example-1"
        onChange={setValue1}
        rows="auto"
        value={value1}
      />
      <TextArea
        aria-label={undefined}
        label="Rows=2"
        name="example-2"
        onChange={setValue2}
        rows={2}
        value={value2}
      />
      <TextArea
        aria-label={undefined}
        label="maxRows=4"
        maxRows={4}
        onChange={setValue3}
        value={value3}
      />
      <TextArea
        aria-label={undefined}
        label="Rows=2, maxRows=4"
        maxRows={4}
        name="example-4"
        onChange={setValue4}
        rows={2}
        value={value4}
      />
      <TextArea
        aria-label={undefined}
        label="Rows=auto, maxRows=4"
        maxRows={4}
        name="example-5"
        onChange={setValue5}
        rows="auto"
        value={value5}
      />
    </Stack>
  )
}

AutomaticRows.parameters = {
  docs: {
    description: {
      story:
        'You can set a number of rows to display in the input, which will change its height. You can set rows="auto" and the textarea will automatically adjust its height based on the content. Use prop `maxRows` so that textArea automatically adjusts its height based on the content until it reaches maxRows (upper bound). When both `maxRows` and `row` are defined, they will respectively be used as an upper bound and a lower bound in the number of rows to display.',
    },
  },
}
