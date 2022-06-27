import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import Text from '../Text'

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
  <div tabIndex={-1} role="tooltip">
    <StyledList>
      <StyledItem>
        <Text as="p" variant="body" prominence="stronger">
          {data.name}
        </Text>
        <Space />
        <Text as="p" variant="body" prominence="stronger">
          {data.value}
        </Text>
      </StyledItem>
      {data.details?.map(detail => (
          <StyledItem key={detail.name}>
            <Text as="p" variant="bodySmall" prominence="stronger">
              {detail.name}
            </Text>
            <Space />
            <Text as="p" variant="bodySmall" prominence="stronger">
              {detail.value}
            </Text>
          </StyledItem>
        ))}
    </StyledList>
  </div>
)

Tooltip.propTypes = {
  data: PropTypes.shape({
    details: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
      }).isRequired,
    ),
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
}

export default Tooltip
