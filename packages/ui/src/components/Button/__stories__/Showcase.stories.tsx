import type { StoryFn } from '@storybook/react'
import { Button, buttonVariants } from '..'
import { Stack, Table, Text } from '../..'
import { SENTIMENTS } from '../../../theme'

const COLUMNS = [
  { label: '' },
  ...buttonVariants.map(variant => ({
    label: variant.toUpperCase(),
  })),
]

export const Showcase: StoryFn<typeof Button> = args => {
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
                    {...args}
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
