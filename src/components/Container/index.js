import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import BorderedBox from '../BorderedBox'
import Box from '../Box'
import { Typography } from '../Typography'

const StyledContainer = styled(Box)`
  margin-top: 40px;
`

const StyledBorderedBox = styled(BorderedBox)`
  padding-left: 24px;
  padding-right: 24px;
  padding-top: ${({ small }) => (small ? 16 : 24)}px;
  padding-bottom: ${({ small }) => (small ? 16 : 24)}px;
  border: 1px solid
    ${({ edition, theme }) =>
      edition ? theme.colors.primary : theme.colors.gray350};
  opacity: ${({ disabled }) => (disabled ? '0.4' : 'inherit')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'default')};

  > * {
    margin-top: 0;
  }
  > * + * {
    margin-top: 16px;
  }
`

const Container = ({
  title,
  subtitle,
  header,
  rightTitle,
  disabled,
  edition,
  small,
  children,
  boxStyle,
  ...props
}) => (
  <StyledContainer {...props}>
    <Box display="flex" justifyContent="space-between">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        mb={1}
      >
        <Typography variant="lead" my={0} mr={2}>
          {title}
        </Typography>
        {subtitle}
      </Box>
      <div>{rightTitle}</div>
    </Box>
    {header}
    <StyledBorderedBox
      css={boxStyle}
      small={small}
      edition={edition}
      disabled={disabled}
    >
      {children}
    </StyledBorderedBox>
  </StyledContainer>
)

Container.defaultProps = {
  title: undefined,
  edition: false,
  header: undefined,
  rightTitle: undefined,
  subtitle: undefined,
  disabled: false,
  small: false,
  boxStyle: undefined,
}

Container.propTypes = {
  title: PropTypes.string,
  edition: PropTypes.bool,
  header: PropTypes.node,
  rightTitle: PropTypes.node,
  subtitle: PropTypes.string,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  children: PropTypes.node.isRequired,
  boxStyle: PropTypes.shape({}),
}

export default Container
