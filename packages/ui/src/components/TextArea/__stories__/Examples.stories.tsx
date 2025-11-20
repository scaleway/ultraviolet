import type { StoryFn } from '@storybook/react-vite'
import { AlertCircleOutlineIcon } from '@ultraviolet/icons'
import { useState } from 'react'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { TextInput } from '../../TextInput'
import { Tooltip } from '../../Tooltip'
import { TextArea } from '..'

export const Examples: StoryFn<typeof TextArea> = () => {
  const [value, setValue] = useState<string>(
    'A long time ago in a galaxy far, far away',
  )

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
