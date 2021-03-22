import { css, keyframes } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import flattenChildren from 'react-flatten-children'
import { colors } from '../../theme'
import { Box } from '../Box'
import Icon from '../Icon'
import { Typography } from '../Typography'

const loadingAnimation = keyframes`
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
`

const styles = {
  container: css`
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-between;
  `,
  line: css`
    position: relative;
    flex: 1;
    height: 4px;
    margin-left: -36px;
    margin-right: -36px;
    margin-top: 12px;
    border-radius: 2px;
    background-color: ${colors.gray350};
  `,
  stepContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 120px;
  `,
  step: css`
    height: 32px;
    width: 32px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  past: css`
    background-color: ${colors.success};
  `,
  future: css`
    height: 32px;
    width: 32px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-style: solid;
    border-color: ${colors.gray350};
    border-width: 3px;
  `,
  futureInternalDot: css`
    background-color: ${colors.gray350};
    height: 8px;
    width: 8px;
    border-radius: 16px;
  `,
  text: css`
    margin-top: 16px;
    font-size: 16px;
    display: flex;
    text-align: center;
  `,
  progress: css`
    border-radius: 2px;
    background-color: ${colors.success};
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  `,
  complete: css`
    width: 100%;
  `,
  animated: css`
    animation: ${loadingAnimation} 1s linear infinite;
  `,
}

const CreationProgress = ({
  children,
  selected,
  animated,
  isStepsNumber,
  ...props
}) => {
  const lastStep = children.length - 1

  return (
    <Box css={styles.container} {...props}>
      {flattenChildren(children).map((child, index) => {
        // if (!child) {
        //   return null
        // }

        const isCurrent = selected === index
        const isPast = selected > index
        const isNotLast = index < lastStep

        return (
          <React.Fragment key={index}>
            <Box css={styles.stepContainer}>
              {isPast || isCurrent ? (
                <Box css={[styles.step, styles.past]}>
                  {isStepsNumber ? (
                    <Typography color="white" fontWeight={500}>
                      {index + 1}
                    </Typography>
                  ) : (
                    <Icon name="check" color="white" size={20} />
                  )}
                </Box>
              ) : (
                <Box css={[styles.step, styles.future]}>
                  {isStepsNumber ? (
                    <Typography
                      style={{ color: colors.gray300 }}
                      fontWeight={500}
                    >
                      {index + 1}
                    </Typography>
                  ) : (
                    <Box css={styles.futureInternalDot} />
                  )}
                </Box>
              )}

              <div css={styles.text}>{child.props.children}</div>
            </Box>

            {isNotLast && (
              <Box css={styles.line}>
                {(isPast || isCurrent) && (
                  <div
                    css={[
                      styles.progress,
                      isPast && styles.complete,
                      isCurrent && animated && styles.animated,
                    ]}
                  />
                )}
              </Box>
            )}
          </React.Fragment>
        )
      })}
    </Box>
  )
}

const Step = () => null
CreationProgress.Step = Step

CreationProgress.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  selected: PropTypes.number,
  animated: PropTypes.bool,
  isStepsNumber: PropTypes.bool,
}

CreationProgress.defaultProps = {
  selected: 0,
  animated: true,
  isStepsNumber: false,
}

export { CreationProgress }
