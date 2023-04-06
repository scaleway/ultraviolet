import type { Story } from '@storybook/react'
import { Banner } from '..'
import { Image } from './Image'

export const Types: Story = () => (
  <>
    <Banner
      title="Apply to Scaleway Startup programs"
      image={<Image />}
      buttonText="Apply now"
      linkText="Learn more"
      type="info"
    >
      The Scaleway Startup programs offer the perfect combination of cloud
      credits, infrastructure advisors and startup experts to develop your
      business and limit your expenses.
    </Banner>
    <Banner
      title="Apply to Scaleway Startup programs"
      image={<Image />}
      buttonText="Apply now"
      linkText="Learn more"
      type="promotional"
    >
      The Scaleway Startup programs offer the perfect combination of cloud
      credits, infrastructure advisors and startup experts to develop your
      business and limit your expenses.
    </Banner>
  </>
)

Types.parameters = {
  docs: {
    storyDescription:
      'We have two different type of Banner: info and promotional.',
  },
}

Types.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
