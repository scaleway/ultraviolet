'use client'

import {
  CheckCircleOutlineIcon,
  CloseCircleOutlineIcon,
} from '@ultraviolet/icons'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { passwordCheckContainer } from './styles.css'

type Rule = {
  name: string
  text: string
  valid: boolean
}

type PasswordCheckProps = {
  /**
   * Is an array of object that contains password rules. `name` is the name of the rule, `text` the text associated
   * with the rule and `valid` is a boolean that determine if the rule is respected or not.
   */
  rules: Rule[]
  className?: string
  'data-testid'?: string
}

/**
 * PasswordCheck is a component that display a list of password rules with a check or a cross depending on the validity
 * of the rule.
 */
export const PasswordCheck = ({
  rules,
  className,
  'data-testid': dataTestId,
}: PasswordCheckProps) => (
  <div
    className={`${className ? `${className} ` : ''}${passwordCheckContainer}`}
    data-testid={dataTestId}
  >
    {rules.map(rule => (
      <Stack alignItems="center" direction="row" gap={1} key={rule.name}>
        {rule.valid ? (
          <CheckCircleOutlineIcon
            prominence="weak"
            sentiment="success"
            size="large"
          />
        ) : (
          <CloseCircleOutlineIcon
            prominence="weak"
            sentiment="neutral"
            size="large"
          />
        )}

        <Text as="p" variant="bodySmall">
          {rule.text}
        </Text>
      </Stack>
    ))}
  </div>
)
