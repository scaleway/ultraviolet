import styled from '@emotion/styled'
import { Snippet, Table, Text } from '../../components'

const StyledCode = styled(Text)`
  background: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  padding: ${({ theme }) => theme.space['2']};
  border-radius: ${({ theme }) => theme.radii.default};
  width: 100%;
  display: block;
`

const StyledRow = styled(Table.Row)`
  height: 70px;
`

const StyledSnippet = styled(Snippet)`
  padding: 16px;
`

const VARIANTS_TO_SENTIMENTS = {
  info: {
    variant: 'filled',
    sentiment: 'info',
  },
  'info-bordered': {
    variant: 'outlined',
    sentiment: 'info',
  },
  link: {
    variant: 'ghost',
    sentiment: 'primary',
  },
  primary: {
    variant: 'filled',
    sentiment: 'primary',
  },
  'primary-bordered': {
    variant: 'outlined',
    sentiment: 'primary',
  },
  'primary-soft-bordered': {
    variant: 'outlined',
    sentiment: 'primary',
  },
  secondary: {
    variant: 'filled',
    sentiment: 'neutral',
  },
  'secondary-bordered': {
    variant: 'outlined',
    sentiment: 'neutral',
  },
  success: {
    variant: 'filled',
    sentiment: 'success',
  },
  'success-bordered': {
    variant: 'outlined',
    sentiment: 'success',
  },
  'success-soft-bordered': {
    variant: 'outlined',
    sentiment: 'success',
  },
  transparent: {
    variant: 'ghost',
    sentiment: 'neutral',
  },
  warning: {
    variant: 'filled',
    sentiment: 'danger',
  },
  'warning-bordered': {
    variant: 'outlined',
    sentiment: 'danger',
  },
  'warning-soft-bordered': {
    variant: 'outlined',
    sentiment: 'danger',
  },
} as const

export const Variants = () => (
  <Table
    columns={[
      { label: 'Previous button version' },
      { label: 'Current button version' },
    ]}
  >
    <Table.Body>
      {Object.keys(VARIANTS_TO_SENTIMENTS).map(variant => {
        const newVersion = `variant="${
          VARIANTS_TO_SENTIMENTS[variant as keyof typeof VARIANTS_TO_SENTIMENTS]
            .variant
        }" sentiment="${
          VARIANTS_TO_SENTIMENTS[variant as keyof typeof VARIANTS_TO_SENTIMENTS]
            .sentiment
        }"`

        return (
          <StyledRow key={variant} id={variant}>
            <Table.Cell>
              <StyledCode as="span" variant="code">
                {`variant="${variant}"`}
              </StyledCode>
            </Table.Cell>
            <Table.Cell>
              <StyledSnippet>{newVersion}</StyledSnippet>
            </Table.Cell>
          </StyledRow>
        )
      })}
    </Table.Body>
  </Table>
)
