import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react-vite'
import type { ExtendedColor } from '../../../theme'
import { SENTIMENTS } from '../../../theme'
import { Stack, Table, Text } from '../..'
import { Button } from '..'

const buttonVariants = ['ghost', 'filled', 'outlined'] as const

const StyledRow = styled(Table.Row, {
  shouldForwardProp: prop => !['sentiment'].includes(prop),
})<{ sentiment: ExtendedColor }>`
  background: ${({ sentiment }) => {
    if (sentiment === 'white') {
      return 'black'
    }
    if (sentiment === 'black') {
      return 'white'
    }

    return 'none'
  }};
`

const COLUMNS = [
  { label: '' },
  ...buttonVariants.map(variant => ({
    label: variant.toUpperCase(),
  })),
]

const onClick = () => {}

export const Showcase: StoryFn<typeof Button> = args => (
  <Table columns={COLUMNS}>
    <Table.Body>
      {([...SENTIMENTS, 'white', 'black'] as const).map(sentiment => (
        <StyledRow id={sentiment} key={sentiment} sentiment={sentiment}>
          <Table.Cell>
            <Text
              as="span"
              sentiment={
                sentiment === 'white' || sentiment === 'black'
                  ? sentiment
                  : undefined
              }
              variant="bodyStrong"
            >
              {sentiment.toUpperCase()}
            </Text>
          </Table.Cell>
          {buttonVariants.map(variant => (
            <Table.Cell key={variant}>
              <Stack direction="row" gap={2}>
                <Button
                  {...args}
                  onClick={onClick}
                  sentiment={sentiment}
                  variant={variant}
                >
                  Button
                </Button>
              </Stack>
            </Table.Cell>
          ))}
        </StyledRow>
      ))}
    </Table.Body>
  </Table>
)

Showcase.parameters = {
  docs: {
    description: {
      story:
        "Button can take different `variant` and `sentiment` props creating all those variations.\n\n **Note that `white` and `black` sentiments will always have those colors no matter the theme**. Those are meant to be used on a background that doesn't change based on the theme.",
    },
  },
}
