import type { StoryFn } from '@storybook/react-vite'
import { Banner } from '..'

export const Sizes: StoryFn = args => (
  <>
    <Banner
      {...args}
      title="Apply to Scaleway Startup programs"
      buttonText="Apply now"
      linkText="Learn more"
      size="medium"
    >
      The Scaleway Startup programs offer the perfect combination of cloud
      credits, advisors and startup experts to develop your business and limit
      your expenses.
    </Banner>
    <Banner
      {...args}
      title="Apply to Scaleway Startup programs"
      buttonText="Apply now"
      linkText="Learn more"
      size="small"
      direction="row"
    >
      The Scaleway Startup programs offer the perfect combination of cloud
      credits, advisors and startup experts to develop your business and limit
      your expenses.
    </Banner>
    <Banner
      {...args}
      title="Apply to Scaleway Startup programs"
      buttonText="Apply now"
      linkText="Learn more"
      size="medium"
      variant="promotional"
    >
      The Scaleway Startup programs offer the perfect combination of cloud
      credits, advisors and startup experts to develop your business and limit
      your expenses.
    </Banner>
    <Banner
      {...args}
      title="Apply to Scaleway Startup programs"
      buttonText="Apply now"
      linkText="Learn more"
      size="small"
      variant="promotional"
      direction="row"
    >
      The Scaleway Startup programs offer the perfect combination of cloud
      credits, advisors and startup experts to develop your business and limit
      your expenses.
    </Banner>
  </>
)

Sizes.parameters = {
  docs: {
    description: {
      story: 'You can define size of a Banner using `size` property.',
    },
  },
}

Sizes.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
