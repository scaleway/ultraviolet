import styled from '@emotion/styled'

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.neutral.text};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 8px;
`

type LabelProps = {
  children: React.ReactNode
  htmlFor?: string
}

const Label = ({ children, htmlFor }: LabelProps) => (
  <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>
)

export default Label
