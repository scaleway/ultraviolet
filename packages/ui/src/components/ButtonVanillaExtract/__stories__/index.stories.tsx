import styled from '@emotion/styled'
import type { Meta, StoryFn } from '@storybook/react'
import { ButtonVanillaExtract } from '..'
import { ThemeProvider } from '../ThemeProvider'

const StyledButton = styled(ButtonVanillaExtract)`
  background-color: red;
  border-color: red;
`

export default {
  component: ButtonVanillaExtract,
  title: 'Components/Action/ButtonVanillaExtract',
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta<typeof ButtonVanillaExtract>

const variants = ['filled', 'ghost', 'outlined'] as const
const sentiments = ['primary', 'secondary', 'danger'] as const

export const Playground: StoryFn<typeof ButtonVanillaExtract> = props => (
  <div
    style={{
      display: 'grid',
      gap: 16,
      gridTemplateColumns: `repeat(${variants.length + 1}, auto)`,
    }}
  >
    <div></div>
    {variants.map(variant => (
      <div key={variant} style={{ fontWeight: 'bold', textAlign: 'center' }}>
        {variant}
      </div>
    ))}
    {sentiments.map(sentiment => (
      <>
        <div
          style={{
            fontWeight: 'bold',
            textAlign: 'right',
            alignSelf: 'center',
          }}
        >
          {sentiment}
        </div>
        {variants.map(variant => (
          <ButtonVanillaExtract
            {...props}
            key={`${sentiment}-${variant}`}
            sentiment={sentiment}
            variant={variant}
            gap="1"
          >
            {sentiment} {variant}
          </ButtonVanillaExtract>
        ))}
      </>
    ))}
  </div>
)

/*
 * Works with existing styled emotion components.
 */
export const WithStyled: StoryFn<typeof ButtonVanillaExtract> = props => (
  <StyledButton {...props} sentiment="primary" variant="filled">
    Button
  </StyledButton>
)

/*
 * Under the hood ButtonVanillaExtract handle data attributes
 */
export const DataAttribute: StoryFn<typeof ButtonVanillaExtract> = props => (
  <ButtonVanillaExtract
    {...props}
    sentiment="primary"
    variant="outlined"
    hasGreenBorder
  >
    Button
  </ButtonVanillaExtract>
)
