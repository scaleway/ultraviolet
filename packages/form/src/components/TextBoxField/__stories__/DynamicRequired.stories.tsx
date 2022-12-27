import { Checkbox, Stack } from '@scaleway/ui'
import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { TextBoxField } from '..'
import { Submit } from '../../Submit'

export const DynamicRequired: Story<
  ComponentProps<typeof TextBoxField>
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
      <TextBoxField required={isRequired} name="required" />
      <Submit>Submit</Submit>
    </Stack>
  )
}
