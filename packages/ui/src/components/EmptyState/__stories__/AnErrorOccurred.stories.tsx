import { Button } from '../../Button'
import { Template } from './Template.stories'
import errorImg from './illustrations/product-error.svg'

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
