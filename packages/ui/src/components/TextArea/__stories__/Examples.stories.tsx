import type { StoryFn } from '@storybook/react'
import { Icon } from '@ultraviolet/icons/legacy'
import { useState } from 'react'
import { TextArea } from '..'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Tooltip } from '../../Tooltip'

export const Examples: StoryFn<typeof TextArea> = () => {
  const [value, setValue] = useState<string>(
    'A long time ago in a galaxy far, far away',
  )

  return (
    <Stack gap={2}>
      <TextArea
        label="Label"
        name="example-1"
        value={value}
        onChange={setValue}
        success="Value has been updated!"
        maxLength={200}
      />
      <TextArea
        label="Label"
        name="example-2"
        value={value}
        onChange={setValue}
        error="Value has been updated!"
      />
      <TextArea
        label="Label"
        labelDescription={<Badge size="small">New</Badge>}
        required
        name="example-3"
        value={value}
        onChange={setValue}
      />
      <TextArea
        label="Label"
        labelDescription={
          <Tooltip text="Tooltip message">
            <Icon name="alert" color="neutral" variant="outlined" />
          </Tooltip>
        }
        required
        name="example-4"
        value={value}
        onChange={setValue}
        helper="Helper text"
      />
    </Stack>
  )
}
