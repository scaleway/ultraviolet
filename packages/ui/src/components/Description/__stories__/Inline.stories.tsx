import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import Description from '..'

export const Inline: Story<ComponentProps<typeof Description>> = () => (
  <Description inline>
    <Description.Term>Name</Description.Term>
    <Description.Desc>Big instance</Description.Desc>
    <Description.Term>Size</Description.Term>
    <Description.Desc>125 GB</Description.Desc>
  </Description>
)
