import { PlusIcon } from '@ultraviolet/icons/PlusIcon'
import { Button } from '../../Button'
import kapsuleLogo from './illustrations/kapsule.webp'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  bordered: true,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  image: kapsuleLogo,
  learnMore: {
    link: 'https://scaleway.com',
    text: 'Learn more',
  },
  primaryButton: (
    <Button sentiment="success">
      <PlusIcon />
      Create
    </Button>
  ),
  secondaryButton: <Button sentiment="neutral">More info</Button>,
  title: 'Playground',
}
