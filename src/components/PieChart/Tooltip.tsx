import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import Typography from '../Typography'

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

const Tooltip = ({ data }: TooltipProps) => {
  const theme = useTheme()

  return (
    <div tabIndex={-1} role="tooltip">
      <StyledList>
        <StyledItem>
          <Typography color={theme.colors.neutral.textStrong}>
            {data.name}
          </Typography>
          <Space />
          <Typography color={theme.colors.neutral.textStrong}>
            {data.value}
          </Typography>
        </StyledItem>
        {data.details &&
          data.details.map(detail => (
            <StyledItem key={detail.name}>
              <Typography variant="bodyB" color={theme.colors.neutral.text}>
                {detail.name}
              </Typography>
              <Space />
              <Typography
                variant="bodyB"
                color={theme.colors.neutral.textStrong}
              >
                {detail.value}
              </Typography>
            </StyledItem>
          ))}
      </StyledList>
    </div>
  )
}

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
