import { Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Breadcrumbs from '..'

export const Template: Story<ComponentProps<typeof Breadcrumbs>> = props => (
  <Breadcrumbs {...props}>
    <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
    <Breadcrumbs.Item to="/step1/step2">Step 2</Breadcrumbs.Item>
    <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
  </Breadcrumbs>
)
