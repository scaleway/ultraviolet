import type { StoryFn } from '@storybook/react-vite'
import { HelpCircleIcon } from '@ultraviolet/icons'
import { cn } from '@ultraviolet/utils'
import { Text } from '..'
import { Stack, Table, Tooltip } from '../..'
import { SENTIMENTS } from '../../../theme'
import { PROMINENCE_ARRAY } from '../constants'
import { showCase } from './style.css'

const COLUMNS = [
  { label: '' },
  ...PROMINENCE_ARRAY.map(prominence => ({
    label: prominence.toUpperCase(),
  })),
]

export const Showcase: StoryFn<typeof Text> = args => (
  <Table columns={COLUMNS}>
    <Table.Body>
      {([...SENTIMENTS, 'white', 'black'] as const).map(sentiment => (
        <Table.Row id={sentiment} key={sentiment} className={showCase({ sentiment })}>
          <Table.Cell>
            <Text
              as="span"
              sentiment={sentiment === 'white' || sentiment === 'black' ? sentiment : undefined}
              variant="bodyStrong"
            >
              {sentiment.toUpperCase()}
            </Text>
          </Table.Cell>
          {PROMINENCE_ARRAY.map(prominence => (
            <Table.Cell key={prominence} className={cn(showCase({ sentiment, prominence }))}>
              <Text {...args} sentiment={sentiment} as="p" variant="body" prominence={prominence}>
                <Stack direction="row" gap={1} alignItems="center">
                  Text
                  <Tooltip text="By default, icons from @ultraviolet/icons inherit color from the text">
                    <HelpCircleIcon />
                  </Tooltip>
                </Stack>
              </Text>
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

Showcase.parameters = {
  docs: {
    description: {
      story:
        "Text can take different `prominence` and `sentiment` props creating all those variations.\n\n **Note that `white` and `black` sentiments will always have those colors no matter the theme**. Those are meant to be used on a background that doesn't change based on the theme.\n\n A background was added to ensure that each example is visible, it is not part of the component.",
    },
  },
}
