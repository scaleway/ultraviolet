import { Button } from '../../Button'
import errorImg from './illustrations/product-error.svg'
import { Template } from './Template.stories'

export const AnErrorOccurred = Template.bind({})
AnErrorOccurred.args = {
  title: 'Oops! Something went wrong!',
  description:
    'Our team has been notified and will look into it. In the meantime, you can try refreshing the page.',
  image: errorImg,
  primaryButton: (
    <Button variant="outlined" sentiment="primary">
      Go back to dashboard
    </Button>
  ),
  size: 'medium',
}
