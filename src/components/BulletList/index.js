import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Box } from '../Box'

export const Steps = styled.ul`
  list-style: none;
  padding-left: 16px;
  margin-top: 24px;
  text-align: left;
  font-size: 16px;
`

export const Step = styled.li`
  margin-bottom: 24px;
  display: flex;
`

export const Chip = styled.span`
  display: inline-block;
  min-width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray700};
  color: ${({ theme }) => theme.colors.white};
  margin-right: 8px;
  text-align: center;
  font-weight: 600;
`

const BulletList = ({ children, keyPrefix }) => (
  <Steps>
    {React.Children.toArray(children).map((child, index) => (
      <Step key={`${keyPrefix ? `${keyPrefix}-` : ''}bullet-${index + 1}`}>
        <Chip>{`${index + 1}`}</Chip>
        <Box width="100%">{child}</Box>
      </Step>
    ))}
  </Steps>
)

BulletList.propTypes = {
  children: PropTypes.node.isRequired,
  keyPrefix: PropTypes.string,
}

BulletList.defaultProps = {
  keyPrefix: null,
}

export default BulletList
