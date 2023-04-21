import type { Story } from '@storybook/react'
import { Banner } from '..'
import image from './Image.png'

export const Sizes: Story = () => (
  <>
    <Banner
      title="Apply to Scaleway Startup programs"
      image={<img src={image} alt="" />}
      buttonText="Apply now"
      linkText="Learn more"
      size="medium"
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
      size="small"
    >
      The Scaleway Startup programs offer the perfect combination of cloud
      credits, infrastructure advisors and startup experts to develop your
      business and limit your expenses.
    </Banner>
  </>
)

Sizes.parameters = {
  docs: {
    storyDescription: 'You can define size of a Banner using `size` property.',
  },
}

Sizes.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
