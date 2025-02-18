import { Alert } from '@ultraviolet/ui'
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
