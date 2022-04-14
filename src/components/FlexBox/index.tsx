import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { ComponentProps, WeakValidationMap } from 'react'

type ChildProps = {
  alignSelf?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch'
  basis?: string | number
  flex?: string | number
  grow?: string | number
  order?: number
  shrink?: string | number
}

const Child = styled('div', {
  shouldForwardProp: prop =>
    !['alignSelf', 'basis', 'grow', 'shrink', 'flex', 'order'].includes(
      prop.toString(),
    ),
})<ChildProps>`
  ${({ alignSelf }) => (alignSelf ? `align-self: ${alignSelf};` : '')}
  ${({ basis }) => (basis ? `flex-basis: ${basis};` : '')}
  ${({ grow }) => (grow ? `flex-grow: ${grow};` : '')}
  ${({ shrink }) => (shrink ? `flex-shrink: ${shrink};` : '')}
  ${({ flex }) => (flex ? `flex: ${flex};` : '')}
  ${({ order }) => (order ? `order: ${order};` : '')}
`

Child.propTypes = {
  alignSelf: PropTypes.oneOf([
    'baseline',
    'center',
    'flex-end',
    'flex-start',
    'stretch',
  ]),
  basis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  grow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  order: PropTypes.number,
  shrink: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

const StyledFlexBox = styled(Child, {
  shouldForwardProp: prop =>
    ![
      'inline',
      'alignContent',
      'alignItems',
      'direction',
      'justifyContent',
      'wrap',
    ].includes(prop.toString()),
})<FlexBoxProps>`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};

  ${({ alignContent }) =>
    alignContent ? `align-content: ${alignContent};` : ''}
  ${({ alignItems }) => (alignItems ? `align-items: ${alignItems};` : '')}
  ${({ direction }) => (direction ? `flex-direction: ${direction};` : '')}
  ${({ justifyContent }) =>
    justifyContent ? `justify-content: ${justifyContent};` : ''}
  ${({ wrap }) => (wrap ? `flex-wrap: ${wrap};` : '')}
`

type FlexBoxProps = {
  alignContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'stretch'
  alignItems?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch'
  direction?: 'column-reverse' | 'column' | 'row-reverse' | 'row'
  inline?: boolean
  justifyContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
  wrap?: 'nowrap' | 'wrap-reverse' | 'wrap'
} & ComponentProps<typeof Child>

type FlexBoxType = ((
  props: ComponentProps<typeof StyledFlexBox>,
) => JSX.Element) & {
  Child: typeof Child
  propTypes: WeakValidationMap<ComponentProps<typeof StyledFlexBox>>
}

const FlexBox: FlexBoxType = props => <StyledFlexBox {...props} />

FlexBox.propTypes = {
  alignContent: PropTypes.oneOf([
    'center',
    'flex-end',
    'flex-start',
    'space-around',
    'space-between',
    'stretch',
  ]),
  alignItems: PropTypes.oneOf([
    'baseline',
    'center',
    'flex-end',
    'flex-start',
    'stretch',
  ]),
  direction: PropTypes.oneOf([
    'column-reverse',
    'column',
    'row-reverse',
    'row',
  ]),
  inline: PropTypes.bool,
  justifyContent: PropTypes.oneOf([
    'center',
    'flex-end',
    'flex-start',
    'space-around',
    'space-between',
    'space-evenly',
  ]),
  wrap: PropTypes.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
  ...Child.propTypes,
}

FlexBox.Child = Child

// Only for storybook, should not be used named
export { Child }
export default FlexBox
