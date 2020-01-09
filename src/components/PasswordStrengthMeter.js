import React, { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import zxcvbn from 'zxcvbn'
import { css } from '@emotion/core'
import { Box } from 'components/Box'
import { Typography } from 'components/Typography'
import { gray100 } from 'theming'

const styles = {
  wrapper: p => css`
    background-color: ${gray100(p)};
    border-radius: 5px;
    height: 8px;
  `,
  strengthBar: css`
    border-radius: 5px;
    height: '100%';
  `,
  title: css`
    display: inline-block;
    vertical-align: top;
    line-height: 22px;
    font-weight: 500;
  `,
  strength: css`
    float: right;
    vertical-align: top;
    font-weight: 500;
  `,
}

export function PasswordStrengthMeter({
  password = '',
  onChange = () => null,
  strength,
  title,
  ...props
}) {
  const [score, setScore] = useState(0)
  const [backgroundColor, setBackgroundColor] = useState(strength[0].color)
  const [width, setWidth] = useState(0)

  const getScore = useCallback(
    password => zxcvbn(password || '').score || 0,
    [],
  )

  const handleChange = useCallback(
    e => {
      if (onChange && zxcvbn) {
        onChange(e)
      }
    },
    [onChange],
  )

  useEffect(() => {
    setBackgroundColor(strength[score].color)
    if (zxcvbn) {
      handleChange(score)
      setScore(getScore(password))
    }

    const toValue = ((score + 1) / strength.length) * 100
    setWidth(`${toValue}%`)
  }, [getScore, handleChange, password, score, strength])

  return (
    <Box {...props} title={title} role="alert" aria-live="polite">
      <Typography variant="bodyB" color="lightBlack" css={styles.title}>
        {title}
      </Typography>

      <Typography
        as="span"
        variant="bodyB"
        css={[styles.strength, css({ color: strength[score].color })]}
      >
        {strength[score].t}
      </Typography>

      <Box css={styles.wrapper} mt={1} mb={2}>
        {motion && (
          <motion.div
            initial={{
              backgroundColor,
              borderRadius: '5px',
              height: '100%',
              width,
            }}
            animate={{ backgroundColor, width }}
            transition={{ duration: 0.5 }}
          />
        )}
      </Box>
    </Box>
  )
}

PasswordStrengthMeter.propTypes = {
  onChange: PropTypes.func,
  password: PropTypes.string,
  strength: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      t: PropTypes.string,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
}
