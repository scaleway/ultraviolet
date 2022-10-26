import { Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Description from '..'

export const Playground: Story<ComponentProps<typeof Description>> = props => (
  <Description {...props}>
    <Description.Term>Name</Description.Term>
    <Description.Desc>Big instance</Description.Desc>
    <Description.Term>Size</Description.Term>
    <Description.Desc>125 GB</Description.Desc>
  </Description>
)
