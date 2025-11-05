import type { StoryFn } from '@storybook/react-vite'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import * as Flags from '..'

export const List: StoryFn = props => (
  <Stack gap={1}>
    {Object.keys(Flags).map(iconName => {
      const Flag = Flags[iconName as keyof typeof Flags]

      return (
        <Stack alignItems="center" direction="row" gap={1} key={iconName}>
          <Flag {...props} />
          <Text as="span" variant="bodyStrong">
            <Snippet>{`import { ${iconName} } from '@ultraviolet/icons/flags/${iconName}'`}</Snippet>
          </Text>
        </Stack>
      )
    })}

    <Text as="p" variant="body">
      It is also possible to import the flags from{' '}
      <Text as="span" variant="codeStronger">
        @ultraviolet/icons/flags
      </Text>
    </Text>
  </Stack>
)

List.args = {
  size: 'large',
}
