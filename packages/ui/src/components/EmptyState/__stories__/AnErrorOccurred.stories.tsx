import { Button } from '../../Button'
import errorImg from './illustrations/product-error.svg'
import { Template } from './Template.stories'

export const AnErrorOccurred = Template.bind({})
AnErrorOccurred.args = {
  description:
    'Our team has been notified and will look into it. In the meantime, you can try refreshing the page.',
  image: errorImg,
  primaryButton: (
    <Button sentiment="primary" variant="outlined">
      Go back to dashboard
    </Button>
  ),
  size: 'medium',
  title: 'Oops! Something went wrong!',
}
