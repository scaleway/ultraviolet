import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { readableColor } from 'polished'
import BorderedBox from '../../components/BorderedBox'
import Separator from '../../components/Separator'
import Text from '../../components/Text'
import lightTheme, { Color } from '../../theme'
import ThemeWrapper from './ThemeWrapper'

const StyledSeparator = styled(Separator)`
  margin: ${({ theme }) => `${theme.space['3']} 0`};
`

const CapitalizedText = styled(Text)`
  text-transform: capitalize;
`

const BlackOrWhiteText = styled(Text)<{ isBackgroundDark: boolean }>`
  color: ${({ isBackgroundDark }) => (isBackgroundDark ? '#fff' : '#000')};
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
                    >
                      <BlackOrWhiteText
                        variant="body"
                        as="p"
                        isBackgroundDark={
                          readableColor(
                            theme.colors[sentiment][context],
                            '#000',
                            '#fff',
                          ) === '#fff'
                        }
                      >
                        {context}
                      </BlackOrWhiteText>
                      <BlackOrWhiteText
                        variant="caption"
                        as="small"
                        isBackgroundDark={
                          readableColor(
                            theme.colors[sentiment][context],
                            '#000',
                            '#fff',
                          ) === '#fff'
                        }
                      >
                        {theme.colors[sentiment][context]}
                      </BlackOrWhiteText>
                    </BorderedBox>
                  ))}
              </div>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                {colorContextKeys
                  .filter(context => context.includes('text'))
                  .map(context => (
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
                    >
                      <BlackOrWhiteText
                        variant="body"
                        as="p"
                        isBackgroundDark={
                          readableColor(
                            theme.colors[sentiment][context],
                            '#000',
                            '#fff',
                          ) === '#fff'
                        }
                      >
                        {context}
                      </BlackOrWhiteText>

                      <BlackOrWhiteText
                        variant="caption"
                        as="small"
                        isBackgroundDark={
                          readableColor(
                            theme.colors[sentiment][context],
                            '#000',
                            '#fff',
                          ) === '#fff'
                        }
                      >
                        {theme.colors[sentiment][context]}
                      </BlackOrWhiteText>
                    </BorderedBox>
                  ))}
              </div>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                {colorContextKeys
                  .filter(context => context.includes('border'))
                  .map(context => (
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
                    >
                      <BlackOrWhiteText
                        variant="body"
                        as="p"
                        isBackgroundDark={
                          readableColor(
                            theme.colors[sentiment][context],
                            '#000',
                            '#fff',
                          ) === '#fff'
                        }
                      >
                        {context}
                      </BlackOrWhiteText>

                      <BlackOrWhiteText
                        variant="caption"
                        as="small"
                        isBackgroundDark={
                          readableColor(
                            theme.colors[sentiment][context],
                            '#000',
                            '#fff',
                          ) === '#fff'
                        }
                      >
                        {theme.colors[sentiment][context]}
                      </BlackOrWhiteText>
                    </BorderedBox>
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
