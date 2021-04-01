import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Typography } from '../Typography'

const StyledList = styled.ul`
  padding: 0 8px 8px 8px;
  margin: 0;
  width: 100%;
`

const StyledItem = styled.li`
  display: flex;
  margin-top: 6px;
  width: 100%;
`

const Space = styled.span`
  position: relative;
  display: flex;
  flex: 1;
  min-width: 5px;
`

const Tooltip = ({ data }) => (
  <div tabIndex="-1" role="tooltip">
    <StyledList>
      <StyledItem>
        <Typography color="darkBlack">{data.name}</Typography>
        <Space />
        <Typography color="darkBlack">{data.value}</Typography>
      </StyledItem>
      {data.details &&
        data.details.map(detail => (
          <StyledItem key={detail.name}>
            <Typography variant="bodyB" color="lightBlack">
              {detail.name}
            </Typography>
            <Space />
            <Typography variant="bodyB" color="darkBlack">
              {detail.value}
            </Typography>
          </StyledItem>
        ))}
    </StyledList>
  </div>
)

Tooltip.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
    details: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,
}

export default Tooltip
