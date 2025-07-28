import { Button } from '../../Button'
import kapsuleLogo from './illustrations/kapsule.webp'
import { Template } from './Template.stories'

export const InATinySpace = Template.bind({})
InATinySpace.args = {
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  image: kapsuleLogo,
  primaryButton: (
    <Button variant="outlined" sentiment="primary" size="small">
      Create a product
    </Button>
  ),
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
