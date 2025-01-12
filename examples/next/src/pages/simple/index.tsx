import { Row, Stack, Text } from '@ultraviolet/ui'

const Simple = () => (
  <Stack gap="5">
    <Row templateColumns="6fr 3fr" gap="3">
      <Text as="h1" variant="headingLarge">
        Your are in a simple Page
      </Text>
    </Row>
  </Stack>
)

export default Simple
