import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import { Col, Grid, Row } from '../Grid'
import { Icon } from '../Icon'

const styles = {
  condition: css`
    display: flex;
    align-items: center;
    margin: 0 0 8px 0;
    font-size: 14px;
  `,
  icon: css`
    margin-right: 8px;
    align-self: center;
  `,
}

function PasswordCheck({ rules }) {
  return (
    <Grid fluid gutter={0}>
      <Row>
        {rules.map(rule => (
          <Col lg={6} key={rule.name}>
            <p css={styles.condition}>
              <Icon
                name={
                  rule.valid ? 'check-circle-outline' : 'close-circle-outline'
                }
                color={rule.valid ? 'success' : 'darkGrey'}
                css={styles.icon}
                size={20}
              />
              {rule.text}
            </p>
          </Col>
        ))}
      </Row>
    </Grid>
  )
}

PasswordCheck.defaultProps = {
  rules: [
    {
      name: 'hasOneUppercase',
      valid: false,
      text: 'Password must have at least one uppercase character',
    },
    {
      name: 'hasOneLowercase',
      valid: false,
      text: 'Password must have at least one lowercase character',
    },
    {
      name: 'hasOneSpecial',
      valid: false,
      text: 'Password must have at least one special character',
    },
    {
      name: 'hasOneNumber',
      valid: false,
      text: 'Password must have at least one number',
    },
    {
      name: 'isLongEnough',
      valid: false,
      text: 'Password must have a minimum of 8 characters',
    },
    {
      name: 'score',
      valid: false,
      text: 'Password strength score',
    },
  ],
}

PasswordCheck.propTypes = {
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      valid: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ),
}

export { PasswordCheck }
