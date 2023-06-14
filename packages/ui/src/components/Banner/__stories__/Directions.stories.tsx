import type { StoryFn } from '@storybook/react'
import { Banner } from '..'
import image from './Image.png'

export const Directions: StoryFn = () => (
  <>
    <Banner
      title="Apply to Scaleway Startup programs"
      image={<img src={image} alt="" />}
      buttonText="Apply now"
      linkText="Learn more"
      direction="row"
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
      direction="column"
    >
      The Scaleway Startup programs offer the perfect combination of cloud
      credits, infrastructure advisors and startup experts to develop your
      business and limit your expenses.
    </Banner>
  </>
)

Directions.parameters = {
  docs: {
    storyDescription:
      'You can define the direction of the Banner using the `direction` property.',
  },
}

Directions.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
