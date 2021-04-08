import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'

const styles = {
  container: css`
    height: 277px;
    display: flex;
    overflow: auto;
  `,
  card: theme => css`
    border: 1px solid ${theme.colors.gray300};
    border-radius: 4px;
    width: 240px;
    height: 261px;
    margin-right: 16px;
  `,
  img: theme => css`
    border: 1px solid ${theme.colors.gray300};
    background-color: ${theme.colors.gray300};
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    width: 240px;
    height: 77px;
  `,
}

const Slider = ({ length, ...props }) => (
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

Slider.defaultProps = {
  length: 4,
}

export default Slider
