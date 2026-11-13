import type { StoryFn } from '@storybook/react-vite'
import { capitalize } from '@ultraviolet/utils'
import { useState } from 'react'
import { SelectableCard } from '..'
import { Row } from '../../../Layout/Row'
import { TextInput } from '../../TextInput'

export const Size: StoryFn = args => {
  const [checkbox, setCheckbox] = useState({ small: true, medium: true, large: true })

  return (
    <>
      <Row templateColumns="1fr 1fr" alignItems="flex-end" gap={1}>
        {(['small', 'medium', 'large'] as const).map(size => (
          <>
            <SelectableCard
              showTick
              type="checkbox"
              {...args}
              key={size}
              checked={checkbox[size]}
              label={capitalize(size)}
              name={size}
              onChange={event => setCheckbox({ ...checkbox, [size]: event.currentTarget.checked })}
              value={size}
              size={size}
            />
            <TextInput label={size} size={size} placeholder="text input placeholder" />
          </>
        ))}
      </Row>
      (<code>TextInput</code> to compare sizes)
    </>
  )
}

Size.parameters = {
  docs: {
    description: {
      story:
        'Change the `Card` size using prop `size`. Medium and Small should be used when the spaces are restricted, mainly without description and to be aligned with Inputs on the same area (e.g. Modal, Dialog, Table, in other cards ...).',
    },
  },
}
Size.decorators = [StoryComponent => <StoryComponent />]
