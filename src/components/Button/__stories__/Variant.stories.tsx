import { ComponentStory } from '@storybook/react'
import Button from '..'

export const Variant: ComponentStory<typeof Button> = () => (
  <>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="success">Success</Button>
    <Button variant="warning">Warning</Button>
    <Button variant="info">Info</Button>

    <Button variant="link">Link</Button>

    <Button variant="primary-bordered">Primary bordered</Button>
    <Button variant="secondary-bordered">Secondary bordered</Button>
    <Button variant="success-bordered">Success bordered</Button>
    <Button variant="warning-bordered">Warning bordered</Button>
    <Button variant="info-bordered">Info bordered</Button>

    <Button variant="primary-soft-bordered">Primary Soft bordered</Button>
    <Button variant="success-soft-bordered">Success Soft bordered</Button>
    <Button variant="warning-soft-bordered">Warning Soft bordered</Button>

    <Button variant="transparent">Transparent</Button>
  </>
)

Variant.parameters = {
  docs: {
    storyDescription: 'This shows how use `variant` on Button.',
  },
}
