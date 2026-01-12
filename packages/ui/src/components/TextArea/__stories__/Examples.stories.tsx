import type { StoryFn } from '@storybook/react-vite'
import { AlertCircleOutlineIcon } from '@ultraviolet/icons'
import { useState } from 'react'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { TextInput } from '../../TextInput'
import { Tooltip } from '../../Tooltip'
import { TextArea } from '..'

const LONG_VALUE =
  'A long time ago, in a galaxy far, far away, amidst the swirling constellations and distant star systems, there existed a realm of unimaginable wonders and ancient mysteries waiting to be discovered. This distant galaxy, filled with countless planets, moons, and celestial phenomena, was home to diverse civilizations, each with their own unique cultures, histories, and legends. Among the stars, epic tales of heroism, adventure, and conflict unfolded, shaping the destinies of countless beings and leaving an indelible mark on the fabric of the universe itself.'

export const Examples: StoryFn<typeof TextArea> = () => {
  const [value, setValue] = useState<string>(
    'A long time ago in a galaxy far, far away',
  )
  const [valueLong, setValueLong] = useState(LONG_VALUE)
  const [rows, setRows] = useState<'auto' | 1>(1)

  return (
    <Stack gap={2}>
      <Text as="div" variant="body">
        Should be the same height as a TextInput when{' '}
        <Text as="span" variant="code">
          rows={1}
        </Text>
      </Text>
      <Stack direction="row">
        <TextArea label="textArea" onChange={setValue} rows={1} />
        <TextInput label="textInput" />
      </Stack>
      <TextArea
        aria-label={undefined}
        label={`Change on focus: rows=${rows}`}
        name="example-1"
        onBlur={() => setRows(1)}
        onChange={setValueLong}
        onFocus={() => setRows('auto')}
        rows={rows}
        value={valueLong}
      />
      <TextArea
        label="Label"
        maxLength={200}
        name="example-1"
        onChange={setValue}
        success="Value has been updated!"
        value={value}
      />
      <TextArea
        error="Value has been updated!"
        label="Label"
        name="example-2"
        onChange={setValue}
        value={value}
      />
      <TextArea
        label="Label"
        labelDescription={<Badge size="small">New</Badge>}
        name="example-3"
        onChange={setValue}
        required
        value={value}
      />
      <TextArea
        helper="Helper text"
        label="Label"
        labelDescription={
          <Tooltip text="Tooltip message">
            <AlertCircleOutlineIcon sentiment="neutral" />
          </Tooltip>
        }
        name="example-4"
        onChange={setValue}
        required
        value={value}
      />
    </Stack>
  )
}
