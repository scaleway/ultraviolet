'use client'

import { CheckCircleIcon, CloseIcon } from '@ultraviolet/icons'
import type { CSSProperties } from 'react'
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
  style?: CSSProperties
}

/**
 * PasswordCheck is a component that display a list of password rules with a check or a cross depending on the validity
 * of the rule.
 */
export const PasswordCheck = ({
  rules,
  className,
  'data-testid': dataTestId,
  style,
}: PasswordCheckProps) => (
  <div
    className={`${className ? `${className} ` : ''}${passwordCheckContainer}`}
    data-testid={dataTestId}
    style={style}
  >
    {rules.map(rule => (
      <Stack alignItems="center" direction="row" gap={1} key={rule.name}>
        {rule.valid ? (
          <CheckCircleIcon prominence="weak" sentiment="success" size="small" />
        ) : (
          <CloseIcon prominence="weak" sentiment="neutral" size="small" />
        )}

        <Text as="p" variant="caption">
          {rule.text}
        </Text>
      </Stack>
    ))}
  </div>
)
