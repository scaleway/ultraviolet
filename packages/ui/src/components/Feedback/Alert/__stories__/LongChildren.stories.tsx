import type { ComponentProps } from 'react'
import { Alert } from '..'
import { Button } from '../../../Action/Button'
import { Stack } from '../../../Layout/Stack'

export const LongChildren = (props: ComponentProps<typeof Alert>) => (
  <Stack gap="3">
    <Alert {...props} sentiment="info" closable title="Information">
      {({ buttonProps }) => (
        <Stack direction="column" alignItems="start" gap={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
          <Button {...buttonProps} onClick={() => alert('Button clicked')}>
            More info
          </Button>
        </Stack>
      )}
    </Alert>

    <Alert {...props} sentiment="info" closable title="Note">
      <ul style={{ margin: 0 }}>
        <li>
          Hubble must be deployed in the <code>kube-system</code> namespace.
        </li>
        <li>
          Do not enable <code>operator/envoy/agent</code> as it may break the managed Cilium.
        </li>
        <li>Costs may arise based on usage.</li>
      </ul>
    </Alert>
  </Stack>
)

LongChildren.parameters = {
  docs: {
    description: {
      story: 'If the children is long the content will be displayed as a column instead of a row.',
    },
  },
}
