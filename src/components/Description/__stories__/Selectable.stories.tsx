import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import Description from '..'

export const Selectable: Story<ComponentProps<typeof Description>> = () => (
  <Description userSelect>
    <Description.Term>Name</Description.Term>
    <Description.Desc>Big instance</Description.Desc>
    <Description.Term>Size</Description.Term>
    <Description.Desc>125 GB</Description.Desc>
  </Description>
)

Selectable.parameters = {
  docs: {
    storyDescription: 'Make description selectable using `selectable` prop.',
  },
}
