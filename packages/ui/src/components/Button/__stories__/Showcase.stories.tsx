import type { ComponentStory } from '@storybook/react'
import { Button, buttonVariants } from '..'
import { Stack, Table, Text } from '../..'
import { SENTIMENTS } from '../../../theme'

const COLUMNS = buttonVariants.map(variant => ({
  label: variant.toUpperCase(),
}))

export const Showcase: ComponentStory<typeof Button> = () => {
  const onClick = () => {}

  return (
    <Table columns={COLUMNS}>
      <Table.Body>
        {SENTIMENTS.map(sentiment => (
          <Table.Row key={sentiment} id={sentiment}>
            <Table.Cell>
              <Text as="span" variant="bodyStrong">
                {sentiment.toUpperCase()}
              </Text>
            </Table.Cell>
            {buttonVariants.map(variant => (
              <Table.Cell key={variant}>
                <Stack direction="row" gap={2}>
                  <Button
                    onClick={onClick}
                    variant={variant}
                    sentiment={sentiment}
                  >
                    Button
                  </Button>
                </Stack>
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
