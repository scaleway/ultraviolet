import { PlusIcon } from '@ultraviolet/icons'
import { Alert, Button, Card, Row, Stack, Text } from '@ultraviolet/ui'
import { useState } from 'react'

export const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <Row templateColumns="9fr 3fr" gap="3">
        <Card>
          <Text as="h1" variant="headingSmall">
            Classic
          </Text>
          <Stack direction="row" gap="2">
            <Button onClick={() => setCount(prevCount => prevCount + 1)}>
              <PlusIcon />
            </Button>
            <Button onClick={() => setCount(0)}>Reset</Button>
          </Stack>
          <Text as="p" variant="body">
            Count:{count}
          </Text>
        </Card>
        <Alert sentiment="info">Alert</Alert>
      </Row>
    </>
  )
}
