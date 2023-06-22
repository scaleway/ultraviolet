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
    size: '',
  },
  'info-bordered': {
    variant: 'outlined',
    sentiment: 'info',
    size: '',
  },
  link: {
    variant: 'ghost',
    sentiment: 'info',
    size: 'xsmall',
  },
  primary: {
    variant: 'filled',
    sentiment: 'primary',
    size: '',
  },
  'primary-bordered': {
    variant: 'outlined',
    sentiment: 'primary',
    size: '',
  },
  'primary-soft-bordered': {
    variant: 'outlined',
    sentiment: 'primary',
    size: '',
  },
  secondary: {
    variant: 'filled',
    sentiment: 'neutral',
    size: '',
  },
  'secondary-bordered': {
    variant: 'outlined',
    sentiment: 'neutral',
    size: '',
  },
  success: {
    variant: 'filled',
    sentiment: 'success',
    size: '',
  },
  'success-bordered': {
    variant: 'outlined',
    sentiment: 'success',
    size: '',
  },
  'success-soft-bordered': {
    variant: 'outlined',
    sentiment: 'success',
    size: '',
  },
  transparent: {
    variant: 'ghost',
    sentiment: 'neutral',
    size: '',
  },
  warning: {
    variant: 'filled',
    sentiment: 'danger',
    size: '',
  },
  'warning-bordered': {
    variant: 'outlined',
    sentiment: 'danger',
    size: '',
  },
  'warning-soft-bordered': {
    variant: 'outlined',
    sentiment: 'danger',
    size: '',
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
        const variantToSentiment =
          VARIANTS_TO_SENTIMENTS[variant as keyof typeof VARIANTS_TO_SENTIMENTS]

        const newVersion = `variant="${
          variantToSentiment.variant
        }" sentiment="${variantToSentiment.sentiment}" ${
          variantToSentiment?.size ? `size="${variantToSentiment?.size}"` : ''
        }`

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
