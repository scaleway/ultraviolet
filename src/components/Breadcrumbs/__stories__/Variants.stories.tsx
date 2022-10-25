import { Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Breadcrumbs, { breadcrumbsVariants } from '..'

export const Variants: Story<ComponentProps<typeof Breadcrumbs>> = props => (
  <>
    {breadcrumbsVariants.map(variant => (
      <>
        <b>{variant}:</b>
        <Breadcrumbs {...props} key={variant} selected={1} variant={variant}>
          <Breadcrumbs.Item>Step 1</Breadcrumbs.Item>
          <Breadcrumbs.Item>Step 2</Breadcrumbs.Item>
          <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
        </Breadcrumbs>
        <br />
      </>
    ))}
  </>
)

Variants.parameters = {
  docs: {
    storyDescription: 'Set `variant` using variant property.',
  },
}
