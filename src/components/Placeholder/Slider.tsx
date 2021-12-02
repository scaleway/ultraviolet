import { Theme, css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { VoidFunctionComponent } from 'react'
import Box from '../Box'

const styles = {
  card: (theme: Theme) => css`
    border: 1px solid ${theme.colorsDeprecated.gray300};
    border-radius: 4px;
    width: 240px;
    height: 261px;
    margin-right: 16px;
  `,
  container: css`
    height: 277px;
    display: flex;
    overflow: auto;
  `,
  img: (theme: Theme) => css`
    border: 1px solid ${theme.colorsDeprecated.gray300};
    background-color: ${theme.colorsDeprecated.gray300};
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    width: 240px;
    height: 77px;
  `,
}

const Slider: VoidFunctionComponent<{
  length?: number
}> = ({ length = 4, ...props }) => (
  <Box css={styles.container} {...props}>
    {Array.from({ length }, (_, i) => (
      <div key={`placeholder-slider-card-${i}`} css={styles.card}>
        <div css={styles.img} />
      </div>
    ))}
  </Box>
)

Slider.propTypes = {
  length: PropTypes.number,
}

export default Slider
