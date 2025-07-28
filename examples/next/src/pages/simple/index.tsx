import { Row, Stack, Text } from '@ultraviolet/ui'

const Simple = () => (
  <Stack gap="5">
    <Row gap="3" templateColumns="6fr 3fr">
      <Text as="h1" variant="headingLarge">
        Your are in a simple Page
      </Text>
    </Row>
  </Stack>
)

export default Simple
