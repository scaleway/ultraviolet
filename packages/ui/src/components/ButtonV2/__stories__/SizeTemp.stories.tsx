import type { ComponentStory } from '@storybook/react'
import { Fragment } from 'react'
import { ButtonV2, buttonSizes } from '..'
import { Stack } from '../..'

export const SizeTemp: ComponentStory<typeof ButtonV2> = () => (
  <Stack alignItems="center" gap={2} direction="row">
    {buttonSizes.map(size => (
      <Fragment key={size}>
        <ButtonV2 icon="pencil" onClick={() => {}} size={size}>
          {size}
        </ButtonV2>
        <ButtonV2 icon="pencil" onClick={() => {}} size={size} />
        <ButtonV2 onClick={() => {}} size={size}>
          {size}
        </ButtonV2>
      </Fragment>
    ))}
  </Stack>
)

SizeTemp.parameters = {
  docs: {
    storyDescription: 'For review purpose only.',
  },
}
