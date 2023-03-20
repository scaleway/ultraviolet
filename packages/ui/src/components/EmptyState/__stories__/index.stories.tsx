import { Button } from '@scaleway/ui'
import type { Meta, Story } from '@storybook/react'
import errorImg from 'assets/illustrations/product-error.svg'
import kapsuleLogo from 'pages/products/kapsule/assets/illustrations/kapsule.webp'
import type { ComponentProps } from 'react'
import { EmptyState } from '..'

export default {
  component: EmptyState,
  title: 'Components/EmptyState',
} as Meta

const Template: Story<ComponentProps<typeof EmptyState>> = args => (
  <EmptyState {...args} />
)

export const SplashScreen = Template.bind({})

SplashScreen.args = {
  title: 'Splash Screen',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  image: kapsuleLogo,
  primaryButton: (
    <Button variant="success" icon="plus">
      Create
    </Button>
  ),
  secondaryButton: <Button variant="secondary">More info</Button>,
  learnMore: {
    link: 'https://scaleway.com',
    text: 'Learn more',
  },
  bordered: true,
}

export const EmptyList = Template.bind({})
EmptyList.args = {
  title: 'Empty List',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  image: kapsuleLogo,
  primaryButton: (
    <Button variant="success" icon="plus">
      Create
    </Button>
  ),
  size: 'medium',
  bordered: true,
}

export const InATinySpace = Template.bind({})
InATinySpace.args = {
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  image: kapsuleLogo,
  primaryButton: <Button variant="primary-bordered">Create a product</Button>,
  size: 'small',
  learnMore: {
    link: 'https://scaleway.com',
    text: 'Learn more',
  },
  bordered: true,
}
InATinySpace.decorators = [
  StoryComponent => (
    <div style={{ margin: '0 auto', width: '350px' }}>
      <StoryComponent />
    </div>
  ),
]

export const AnErrorOccurred = Template.bind({})
AnErrorOccurred.args = {
  title: 'Oops! Something went wrong!',
  description:
    'Our team has been notified and will look into it. In the meantime, you can try refreshing the page.',
  image: errorImg,
  primaryButton: (
    <Button variant="primary-bordered">Go back to dashboard</Button>
  ),
  size: 'medium',
}
