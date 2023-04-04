import type { ComponentStory } from '@storybook/react'
import { ButtonV2 } from '..'
import { Stack } from '../..'

export const IconPosition: ComponentStory<typeof ButtonV2> = () => (
  <Stack alignItems="center" gap={2} direction="row">
    <ButtonV2 icon="pencil" onClick={() => {}} iconPosition="left">
      Left
    </ButtonV2>
    <ButtonV2 icon="pencil" onClick={() => {}} iconPosition="right">
      Right
    </ButtonV2>
  </Stack>
)

IconPosition.parameters = {
  docs: {
    storyDescription:
      'You can change the icon/loader using the prop `iconPosition`.',
  },
}
