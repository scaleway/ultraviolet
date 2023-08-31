import { Button } from '..'
import { Stack } from '../../Stack'

// TODO: remove after merge, ony for testing purposes
export const Test = () => (
  <Stack gap={2} direction="row">
    <Button variant="filled" sentiment="neutral" fullWidth>
      Button with fullWidth prop
    </Button>
    <Button
      fullWidth
      tooltip="testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest"
    >
      Button with fullWidth prop
    </Button>
  </Stack>
)
