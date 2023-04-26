import type { Story } from '@storybook/react'
import { Banner } from '..'
import image from './Image.png'

export const Variants: Story = () => (
  <>
    <Banner
      title="Apply to Scaleway Startup programs"
      image={<img src={image} alt="" />}
      buttonText="Apply now"
      linkText="Learn more"
      variant="intro"
    >
      The Scaleway Startup programs offer the perfect combination of cloud
      credits, infrastructure advisors and startup experts to develop your
      business and limit your expenses.
    </Banner>
    <Banner
      title="Apply to Scaleway Startup programs"
      image={<img src={image} alt="" />}
      buttonText="Apply now"
      linkText="Learn more"
      variant="promotional"
    >
      The Scaleway Startup programs offer the perfect combination of cloud
      credits, infrastructure advisors and startup experts to develop your
      business and limit your expenses.
    </Banner>
  </>
)

Variants.parameters = {
  docs: {
    storyDescription:
      'We have two different variant of Banner: intro and promotional.',
  },
}

Variants.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
