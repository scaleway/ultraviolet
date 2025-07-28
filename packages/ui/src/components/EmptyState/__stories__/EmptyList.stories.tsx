import { PlusIcon } from '@ultraviolet/icons'
import { Button } from '../../Button'
import kapsuleLogo from './illustrations/kapsule.webp'
import { Template } from './Template.stories'

export const EmptyList = Template.bind({})
EmptyList.args = {
  title: 'Empty List',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  image: kapsuleLogo,
  primaryButton: (
    <Button sentiment="success">
      <PlusIcon />
      Create
    </Button>
  ),
  size: 'medium',
  bordered: true,
}
