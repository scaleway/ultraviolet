import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Box } from '../Box'
import Icon from '../Icon'
import { MarkDown } from '../MarkDown'

const Container = styled(Box)`
  color: ${({ theme: { colors } }) => colors.gray550};
  font-size: 12px;
  display: flex;
  align-items: center;
`

const Notice = ({ children, ...props }) => (
  <Container {...props}>
    <Icon name="information-outline" verticalAlign="top" mr={1} size={20} />
    <MarkDown source={children} linkTarget="_blank" />
  </Container>
)
Notice.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Notice
