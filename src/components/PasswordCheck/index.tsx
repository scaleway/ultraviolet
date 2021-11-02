import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'
import { Col, Grid, Row } from '../Grid'
import Icon from '../Icon'

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

type Rule = {
  name: string
  text: string
  valid: boolean
}

export type PasswordCheckProps = {
  /**
   * Is an array of object that contains password rules. `name` is the name of the rule, `text` the text associated
   * with the rule and `valid` is a boolean that determine if the rule is respected or not.
   */
  rules: Rule[]
}

const PasswordCheck: FunctionComponent<PasswordCheckProps> = ({ rules }) => (
  <Grid fluid gutter={0}>
    <Row>
      {rules.map(rule => (
        <Col large={6} key={rule.name}>
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

PasswordCheck.propTypes = {
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      valid: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
}

export default PasswordCheck
