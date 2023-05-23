import type { ComponentStory } from '@storybook/react'
import { Button, buttonVariants } from '..'
import { Stack, Table, Text } from '../..'
import { SENTIMENTS } from '../../../theme'

export const Showcase: ComponentStory<typeof Button> = () => {
  const onClick = () => {}

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell width="120px">Combination</Table.HeadCell>
          {buttonVariants.map(variant => (
            <Table.HeadCell key={variant}>
              <Text as="span" variant="bodyStrong">
                {variant.toUpperCase()}
              </Text>
            </Table.HeadCell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {SENTIMENTS.map(sentiment => (
          <Table.Row key={sentiment}>
            <Table.BodyCell>
              <Text as="span" variant="bodyStrong">
                {sentiment.toUpperCase()}
              </Text>
            </Table.BodyCell>
            {buttonVariants.map(variant => (
              <Table.BodyCell key={variant}>
                <Stack direction="row" gap={2}>
                  <Button
                    onClick={onClick}
                    variant={variant}
                    sentiment={sentiment}
                  >
                    Button
                  </Button>
                </Stack>
              </Table.BodyCell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
