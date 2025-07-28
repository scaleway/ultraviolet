import type { StoryFn } from '@storybook/react-vite'
import { Banner } from '..'

export const Directions: StoryFn = args => (
  <>
    <Banner
      {...args}
      buttonText="Apply now"
      direction="row"
      linkText="Learn more"
      title="Apply to Scaleway Startup programs"
    >
      The Scaleway Startup programs offer the perfect combination of cloud
      credits, infrastructure advisors and startup experts to develop your
      business and limit your expenses.
    </Banner>
    <Banner
      {...args}
      buttonText="Apply now"
      direction="column"
      linkText="Learn more"
      title="Apply to Scaleway Startup programs"
    >
      The Scaleway Startup programs offer the perfect combination of cloud
      credits, infrastructure advisors and startup experts to develop your
      business and limit your expenses.
    </Banner>
  </>
)

Directions.parameters = {
  docs: {
    description: {
      story:
        'You can define the direction of the Banner using the `direction` property.',
    },
  },
}

Directions.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
