import styled from '@emotion/styled'
import { Icon, Stack, Text } from '../..'

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
}

const PasswordCheckContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.space['1']};
`

const PasswordCheck = ({ rules }: PasswordCheckProps) => (
  <PasswordCheckContainer>
    {rules.map(rule => (
      <Stack direction="row" gap={1} alignItems="center" key={rule.name}>
        <Icon
          name={rule.valid ? 'check-circle-outline' : 'close-circle-outline'}
          color={rule.valid ? 'success' : 'neutral'}
          prominence="weak"
          size={20}
        />
        <Text as="p" variant="bodySmall">
          {rule.text}
        </Text>
      </Stack>
    ))}
  </PasswordCheckContainer>
)

export default PasswordCheck
