import { Link as UVLink } from '../../Link'
import { Stack } from '../../Stack'
import { Alert } from '..'

export const Link = () => (
  <Stack gap={1}>
    <Alert sentiment="info" title="Information">
      <Stack direction="row" flex="1 1 auto" justifyContent="space-between">
        <p>You cannot create a ressource here</p>
        <UVLink href="scaleway.com">Read more</UVLink>
      </Stack>
    </Alert>
    <Alert sentiment="info" title="Information">
      <p>
        You cannot create a ressource here If you believe this is an error,{' '}
        <UVLink href="scaleway.com" target="_blank" variant="inline">
          contact support for further assistance this is an error
        </UVLink>
        . Additionally, ensure that you have the necessary permissions to access
        this resource.
      </p>
    </Alert>
  </Stack>
)

Link.parameters = {
  docs: {
    description: {
      story:
        'If you need you can add a link into the Alert component. You will need to add a Stack as children of the Alert component to align the link at the end.',
    },
  },
}
