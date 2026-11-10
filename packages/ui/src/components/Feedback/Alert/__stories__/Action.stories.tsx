import type { StoryFn } from '@storybook/react-vite'
import { Alert } from '..'
import { Button } from '../../../Action/Button'
import { Link } from '../../../Action/Link'
import { Stack } from '../../../Layout/Stack'
import { Modal } from '../../../Overlay/Modal'

export const Action: StoryFn<typeof Alert> = args => (
  <Stack gap={1}>
    <Alert
      {...args}
      action={({ buttonProps }) => (
        <Modal disclosure={<Button {...buttonProps}>Restore</Button>}>Sample modal content.</Modal>
      )}
      sentiment="danger"
      title="This email account is being deleted"
    >
      Accounts are retained for 12 months before permanent deletion.
    </Alert>

    <Alert {...args} action={<Link href="scaleway.com">Read more</Link>} sentiment="info" title="Information">
      You cannot create a ressource here
    </Alert>

    <Alert {...args} sentiment="info" title="Information">
      <p>
        You cannot create a ressource here If you believe this is an error,{' '}
        <Link href="scaleway.com" target="_blank">
          contact support for further assistance this is an error
        </Link>
        . Additionally, ensure that you have the necessary permissions to access this resource.
      </p>
    </Alert>
  </Stack>
)

Action.parameters = {
  docs: {
    description: {
      story:
        'Use the `action` prop to add a `Link` or a `Button` at the end of the alert. Actions can also be placed inside the children when the content needs a custom layout. Pass a function to `action` or `children` to get the alert `buttonProps` (`sentiment`, `disabled`, `size`) for a correctly themed `Button`.',
    },
  },
}
