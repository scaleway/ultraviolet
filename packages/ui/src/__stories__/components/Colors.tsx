import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { BorderedBox } from '../../components/BorderedBox'
import { Separator } from '../../components/Separator'
import { Stack } from '../../components/Stack'
import { Text } from '../../components/Text'
import type { Color } from '../../theme'
import type lightTheme from '../../theme'
import ThemeWrapper from './ThemeWrapper'

const StyledSeparator = styled(Separator)`
  margin: ${({ theme }) => `${theme.space['3']} 0`};
`

const CapitalizedText = styled(Text)`
  text-transform: capitalize;
`

type AvailableContexts = keyof typeof lightTheme['colors'][Color]

const Colors = () => {
  const theme = useTheme()

  return (
    <>
      {(Object.keys(theme.colors) as Color[]).map(sentiment => {
        const colorContextKeys = Object.keys(
          theme.colors[sentiment],
        ) as AvailableContexts[]

        return (
          <>
            <CapitalizedText variant="headingSmall" as="h3">
              {sentiment}
            </CapitalizedText>
            <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                {colorContextKeys
                  .filter(context => context.includes('background'))
                  .map(context => (
                    <Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text variant="body" as="p">
                          {context}
                        </Text>
                        <Text variant="caption" as="small">
                          {theme.colors[sentiment][context]}
                        </Text>
                      </Stack>

                      <BorderedBox
                        key={context}
                        style={{
                          alignItems: 'center',
                          backgroundColor: theme.colors[sentiment][context],
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: 8,
                          width: 275,
                        }}
                      />
                    </Stack>
                  ))}
              </div>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                {colorContextKeys
                  .filter(context => context.includes('text'))
                  .map(context => (
                    <Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text variant="body" as="p">
                          {context}
                        </Text>
                        <Text variant="caption" as="small">
                          {theme.colors[sentiment][context]}
                        </Text>
                      </Stack>
                      <BorderedBox
                        key={context}
                        style={{
                          alignItems: 'center',
                          backgroundColor: theme.colors[sentiment][context],
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: 8,
                          width: 275,
                        }}
                      />
                    </Stack>
                  ))}
              </div>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                {colorContextKeys
                  .filter(context => context.includes('border'))
                  .map(context => (
                    <Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text variant="body" as="p">
                          {context}
                        </Text>
                        <Text variant="caption" as="small">
                          {theme.colors[sentiment][context]}
                        </Text>
                      </Stack>
                      <BorderedBox
                        key={context}
                        style={{
                          alignItems: 'center',
                          backgroundColor: theme.colors[sentiment][context],
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: 8,
                          width: 275,
                        }}
                      />
                    </Stack>
                  ))}
              </div>
            </div>
            <StyledSeparator />
          </>
        )
      })}
    </>
  )
}

const Container = () => (
  <ThemeWrapper>
    <Colors />
  </ThemeWrapper>
)

export default Container
