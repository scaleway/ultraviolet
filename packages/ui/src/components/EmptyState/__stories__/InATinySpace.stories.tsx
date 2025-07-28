import { Button } from '../../Button'
import kapsuleLogo from './illustrations/kapsule.webp'
import { Template } from './Template.stories'

export const InATinySpace = Template.bind({})
InATinySpace.args = {
  bordered: true,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  image: kapsuleLogo,
  learnMore: {
    link: 'https://scaleway.com',
    text: 'Learn more',
  },
  primaryButton: (
    <Button sentiment="primary" size="small" variant="outlined">
      Create a product
    </Button>
  ),
  size: 'small',
}

InATinySpace.decorators = [
  StoryComponent => (
    <div style={{ margin: '0 auto', width: '350px' }}>
      <StoryComponent />
    </div>
  ),
]
