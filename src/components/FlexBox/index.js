import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'

const StyledChild = styled('div', {
  shouldForwardProp: prop =>
    !['alignSelf', 'basis', 'grow', 'shrink', 'flex', 'order'].includes(prop),
})`
  ${({ alignSelf }) => (alignSelf ? `align-self: ${alignSelf};` : '')}
  ${({ basis }) => (basis ? `flex-basis: ${basis};` : '')}
  ${({ grow }) => (grow ? `flex-grow: ${grow};` : '')}
  ${({ shrink }) => (shrink ? `flex-shrink: ${shrink};` : '')}
  ${({ flex }) => (flex ? `flex: ${flex};` : '')}
  ${({ order }) => (order ? `order: ${order};` : '')}
`

const Child = props => <StyledChild {...props} />

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

Child.defaultProps = {
  alignSelf: undefined,
  basis: undefined,
  flex: undefined,
  grow: undefined,
  order: undefined,
  shrink: undefined,
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
    ].includes(prop),
})`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};

  ${({ alignContent }) =>
    alignContent ? `align-content: ${alignContent};` : ''}
  ${({ alignItems }) => (alignItems ? `align-items: ${alignItems};` : '')}
  ${({ direction }) => (direction ? `flex-direction: ${direction};` : '')}
  ${({ justifyContent }) =>
    justifyContent ? `justify-content: ${justifyContent};` : ''}
  ${({ wrap }) => (wrap ? `flex-wrap: ${wrap};` : '')}
`

const FlexBox = props => <StyledFlexBox {...props} />

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
  ]),
  wrap: PropTypes.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
  ...Child.propTypes,
}

FlexBox.defaultProps = {
  alignContent: undefined,
  alignItems: undefined,
  direction: undefined,
  inline: undefined,
  justifyContent: undefined,
  wrap: undefined,
}

FlexBox.Child = Child

// Only for storybook, should not be used named
export { Child }
export default FlexBox
