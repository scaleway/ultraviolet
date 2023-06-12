import { Checkbox, Stack } from '@scaleway/ui'
import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { TextInputField } from '..'
import { Submit } from '../../Submit'

export const DynamicRequired: StoryFn<
  ComponentProps<typeof TextInputField>
> = () => {
  const [isRequired, setIsRequired] = useState(true)

  return (
    <Stack gap={1}>
      <Checkbox
        checked={isRequired}
        onChange={() => setIsRequired(!isRequired)}
      >
        Is field required?
      </Checkbox>
      <TextInputField required={isRequired} name="required" />
      <Submit>Submit</Submit>
    </Stack>
  )
}
