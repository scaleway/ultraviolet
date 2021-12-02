import { Interpolation, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent, ReactNode } from 'react'
import Box from '../Box'
import FlexBox from '../FlexBox'
import Typography from '../Typography'

const StyledContainer = styled(Box)`
  margin-top: 40px;
`

const StyledTitleContainer = styled(FlexBox)`
  margin-bottom: ${({ theme }) => theme.space['1']};
`

const StyledBox = styled(Box, {
  shouldForwardProp: props => !['small', 'edition'].includes(props.toString()),
})<{
  small?: boolean
  edition?: boolean
  disabled?: boolean
}>`
  padding-left: 24px;
  padding-right: 24px;
  padding-top: ${({ small }) => (small ? 16 : 24)}px;
  padding-bottom: ${({ small }) => (small ? 16 : 24)}px;
  border: 1px solid
    ${({ edition, theme }) =>
      edition
        ? theme.colorsDeprecated.primary
        : theme.colorsDeprecated.gray350};
  opacity: ${({ disabled }) => (disabled ? '0.4' : 'inherit')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'default')};

  > * {
    margin-top: 0;
  }
  > * + * {
    margin-top: 16px;
  }
`

export type ContainerProps = {
  boxStyle?: Interpolation<Theme>
  children: ReactNode
  disabled?: boolean
  edition?: boolean
  header?: ReactNode
  rightTitle?: ReactNode
  small?: boolean
  subtitle?: string
  title?: string
}

const Container: FunctionComponent<ContainerProps> = ({
  title,
  subtitle,
  header,
  rightTitle,
  disabled = false,
  edition = false,
  small = false,
  children,
  boxStyle,
  ...props
}) => (
  <StyledContainer {...props}>
    <FlexBox justifyContent="space-between">
      <StyledTitleContainer>
        <Typography variant="lead" my={0} mr={2}>
          {title}
        </Typography>
        {subtitle}
      </StyledTitleContainer>
      <div>{rightTitle}</div>
    </FlexBox>
    {header}
    <StyledBox
      bordered
      css={boxStyle}
      small={small}
      edition={edition}
      disabled={disabled}
    >
      {children}
    </StyledBox>
  </StyledContainer>
)

Container.propTypes = {
  boxStyle: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  edition: PropTypes.bool,
  /**
   * Header can be a string but also a component.
   */
  header: PropTypes.node,
  /**
   * Right title can be a string but also a component, like header properties does.
   */
  rightTitle: PropTypes.node,
  small: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
}

export default Container
