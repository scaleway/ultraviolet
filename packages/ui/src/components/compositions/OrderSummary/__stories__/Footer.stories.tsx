import { Alert } from '../../../Alert'
import { Template } from './Template.stories'

const alert = (
  <Alert sentiment="info">
    Apple requires you to keep a Mac mini for at least 24 hours. If you no
    longer need it after that period, you can manually delete it to avoid
    further billing.
  </Alert>
)
export const Footer = Template.bind({})

Footer.args = {
  ...Template.args,
  footer: alert,
}

Footer.parameters = {
  docs: {
    description: {
      story:
        'Similarly to the `children` prop, the `footer` prop allows you to pass any ReactNode to the footer of the component, right below the total price of the order.',
    },
  },
}
