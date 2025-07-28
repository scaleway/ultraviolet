import type { StoryFn } from '@storybook/react-vite'
import { Banner } from '..'

export const Variants: StoryFn = args => (
  <>
    <Banner
      {...args}
      buttonText="Apply now"
      linkText="Learn more"
      title="Apply to Scaleway Startup programs"
      variant="intro"
    >
      The Scaleway Startup programs offer the perfect combination of cloud
      credits, infrastructure advisors and startup experts to develop your
      business and limit your expenses.
    </Banner>
    <Banner
      {...args}
      buttonText="Apply now"
      linkHref="/?path=/story/components-other-banner--variants&globals=theme:light"
      linkText="Learn more"
      title="Apply to Scaleway Startup programs"
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
    description: {
      story: 'We have two different variant of Banner: intro and promotional.',
    },
  },
}

Variants.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
