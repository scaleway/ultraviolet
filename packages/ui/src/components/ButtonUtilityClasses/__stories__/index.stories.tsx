import type { Meta, StoryFn } from '@storybook/react'
import { ButtonUtilityClasses } from '..'
import styled from '@emotion/styled'

export default {
  component: ButtonUtilityClasses,
  title: 'Components/Action/ButtonUtilityClasses',
} as Meta<typeof ButtonUtilityClasses>

const StyledButton = styled(ButtonUtilityClasses)`
  background-color: red;
  border-color: red;
`

const variants = ['filled', 'ghost', 'outlined'] as const
const sentiments = ['primary', 'secondary', 'danger'] as const

export const Playground: StoryFn<typeof ButtonUtilityClasses> = props => (
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
          <ButtonUtilityClasses
            {...props}
            key={`${sentiment}-${variant}`}
            sentiment={sentiment}
            variant={variant}
          >
            {sentiment} {variant}
          </ButtonUtilityClasses>
        ))}
      </>
    ))}
  </div>
)

/*
 * Works with existing styled emotion components.
 */
export const WithStyled: StoryFn<typeof ButtonUtilityClasses> = props => (
  <StyledButton {...props} sentiment="primary" variant="filled">
    Button
  </StyledButton>
)

/*
 * Under the hood ButtonVanillaExtract handle data attributes
 */
export const DataAttribute: StoryFn<typeof ButtonUtilityClasses> = props => (
  <ButtonUtilityClasses
    {...props}
    sentiment="primary"
    variant="outlined"
    hasGreenBorder
  >
    Button
  </ButtonUtilityClasses>
)

/*
 * Class utility allow any class to be applied to className prop. This can be problematic for ensuring design system consistency.
 */
export const CustomClass: StoryFn<typeof ButtonUtilityClasses> = props => (
  <ButtonUtilityClasses
    {...props}
    sentiment="primary"
    variant="outlined"
    className="color-success-border-strong"
  >
    Button
  </ButtonUtilityClasses>
)
