import { useTheme } from '@emotion/react'
import { readableColor } from 'polished'
import React from 'react'
import BorderedBox from '../../components/BorderedBox'
import Separator from '../../components/Separator'
import Typography from '../../components/Typography'
import ThemeWrapper from './ThemeWrapper'

const Colors = () => {
  const theme = useTheme()
  console.log(theme.colors)

  return (
    <>
      {Object.keys(theme.colors).map(sentiment => (
        <>
          <Typography variant="title" style={{ textTransform: 'capitalize' }}>
            {sentiment}
          </Typography>
          <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {Object.keys(
                (theme.colors as Record<string, Record<string, string>>)[
                  sentiment
                ],
              )
                .filter(context => context.includes('background'))
                ?.map(context => (
                  <BorderedBox
                    key={context}
                    style={{
                      alignItems: 'center',
                      backgroundColor: (
                        theme.colors as Record<string, Record<string, string>>
                      )[sentiment][context],
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 8,
                      width: 275,
                    }}
                  >
                    <Typography
                      color={readableColor(
                        (
                          theme.colors as Record<string, Record<string, string>>
                        )[sentiment][context],
                      )}
                    >
                      {context}
                    </Typography>
                    <Typography
                      variant="tiny"
                      color={readableColor(
                        (
                          theme.colors as Record<string, Record<string, string>>
                        )[sentiment][context],
                      )}
                    >
                      {
                        (
                          theme.colors as Record<string, Record<string, string>>
                        )[sentiment][context]
                      }
                    </Typography>
                  </BorderedBox>
                ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {Object.keys(
                (theme.colors as Record<string, Record<string, string>>)[
                  sentiment
                ],
              )
                .filter(context => context.includes('text'))
                ?.map(context => (
                  <BorderedBox
                    key={context}
                    style={{
                      alignItems: 'center',
                      backgroundColor: (
                        theme.colors as Record<string, Record<string, string>>
                      )[sentiment][context],
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 8,
                      width: 275,
                    }}
                  >
                    <Typography
                      color={readableColor(
                        (
                          theme.colors as Record<string, Record<string, string>>
                        )[sentiment][context],
                      )}
                    >
                      {context}
                    </Typography>
                    <Typography
                      variant="tiny"
                      color={readableColor(
                        (
                          theme.colors as Record<string, Record<string, string>>
                        )[sentiment][context],
                      )}
                    >
                      {
                        (
                          theme.colors as Record<string, Record<string, string>>
                        )[sentiment][context]
                      }
                    </Typography>
                  </BorderedBox>
                ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {Object.keys(
                (theme.colors as Record<string, Record<string, string>>)[
                  sentiment
                ],
              )
                .filter(context => context.includes('border'))
                ?.map(context => (
                  <BorderedBox
                    key={context}
                    style={{
                      alignItems: 'center',
                      backgroundColor: (
                        theme.colors as Record<string, Record<string, string>>
                      )[sentiment][context],
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 8,
                      width: 275,
                    }}
                  >
                    <Typography
                      color={readableColor(
                        (
                          theme.colors as Record<string, Record<string, string>>
                        )[sentiment][context],
                      )}
                    >
                      {context}
                    </Typography>
                    <Typography
                      variant="tiny"
                      color={readableColor(
                        (
                          theme.colors as Record<string, Record<string, string>>
                        )[sentiment][context],
                      )}
                    >
                      {
                        (
                          theme.colors as Record<string, Record<string, string>>
                        )[sentiment][context]
                      }
                    </Typography>
                  </BorderedBox>
                ))}
            </div>
          </div>
          <Separator style={{ margin: `24px 0` }} />
        </>
      ))}
    </>
  )
}

const Container = () => (
  <ThemeWrapper>
    <Colors />
  </ThemeWrapper>
)

export default Container
