'use client'

import styled from '@emotion/styled'
import { Text } from '../Text'

const StyledList = styled.ul`
  padding: 0 8px 8px 8px;
  margin: 0;
  width: 100%;
`

const StyledItem = styled.li`
  display: flex;
  margin-top: 6px;
  width: 100%;
  justify-content: space-between;
  text-align: left;
  gap: 8px;
`

type TooltipProps = {
  data: {
    name?: string | null
    value?: string | null
    details?:
      | {
          name?: string | null
          value?: string | null
        }[]
      | null
  }
}

const Tooltip = ({ data }: TooltipProps) => (
  <div role="tooltip" tabIndex={-1}>
    <StyledList>
      <StyledItem>
        <Text as="p" prominence="stronger" variant="body">
          {data.name}
        </Text>
        <Text as="p" prominence="stronger" variant="body">
          {data.value}
        </Text>
      </StyledItem>
      {data.details?.map(detail => (
        <StyledItem key={detail.name}>
          <Text as="p" prominence="stronger" variant="bodySmall">
            {detail.name}
          </Text>
          <Text as="p" prominence="stronger" variant="bodySmall">
            {detail.value}
          </Text>
        </StyledItem>
      ))}
    </StyledList>
  </div>
)

export default Tooltip
