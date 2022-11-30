import { ComponentStory } from '@storybook/react'
import Button from '..'

export const Variant: ComponentStory<typeof Button> = ({ ...props }) => (
  <>
    <Button variant="primary" {...props}>
      Primary
    </Button>
    <Button variant="secondary" {...props}>
      Secondary
    </Button>
    <Button variant="success" {...props}>
      Success
    </Button>
    <Button variant="warning" {...props}>
      Warning
    </Button>
    <Button variant="info" {...props}>
      Info
    </Button>

    <Button variant="link" {...props}>
      Link
    </Button>

    <Button variant="primary-bordered" {...props}>
      Primary bordered
    </Button>
    <Button variant="secondary-bordered" {...props}>
      Secondary bordered
    </Button>
    <Button variant="success-bordered" {...props}>
      Success bordered
    </Button>
    <Button variant="warning-bordered" {...props}>
      Warning bordered
    </Button>
    <Button variant="info-bordered" {...props}>
      Info bordered
    </Button>

    <Button variant="primary-soft-bordered" {...props}>
      Primary Soft bordered
    </Button>
    <Button variant="success-soft-bordered" {...props}>
      Success Soft bordered
    </Button>
    <Button variant="warning-soft-bordered" {...props}>
      Warning Soft bordered
    </Button>

    <Button variant="transparent">Transparent</Button>
  </>
)

Variant.parameters = {
  docs: {
    storyDescription: 'This shows how use `variant` on Button.',
  },
}
