import type { ComponentProps } from 'react'
import { Button, ButtonV2, Table } from '../../components'

const MOCK_ONCLICK = () => {}

const VARIANT_MATCH: Record<
  Required<ComponentProps<typeof Button>>['variant'],
  {
    variant: Required<ComponentProps<typeof ButtonV2>>['variant']
    sentiment: Required<ComponentProps<typeof ButtonV2>>['sentiment']
  }
> = {
  info: { variant: 'filled', sentiment: 'info' },
  'info-bordered': { variant: 'outlined', sentiment: 'info' },
  link: { variant: 'ghost', sentiment: 'primary' },
  primary: { variant: 'filled', sentiment: 'primary' },
  'primary-bordered': { variant: 'outlined', sentiment: 'primary' },
  'primary-soft-bordered': { variant: 'outlined', sentiment: 'neutral' },
  secondary: { variant: 'filled', sentiment: 'neutral' },
  'secondary-bordered': { variant: 'outlined', sentiment: 'neutral' },
  success: { variant: 'filled', sentiment: 'success' },
  'success-bordered': { variant: 'outlined', sentiment: 'success' },
  'success-soft-bordered': { variant: 'outlined', sentiment: 'neutral' },
  transparent: { variant: 'ghost', sentiment: 'neutral' },
  warning: { variant: 'filled', sentiment: 'danger' },
  'warning-bordered': { variant: 'outlined', sentiment: 'danger' },
  'warning-soft-bordered': { variant: 'outlined', sentiment: 'neutral' },
}

const Variants = () => (
  <Table>
    <Table.Head>
      <Table.HeadCell>Button V1 variant</Table.HeadCell>
      <Table.HeadCell>Button V2 variant + sentiment</Table.HeadCell>
    </Table.Head>
    <Table.Body>
      {(Object.keys(VARIANT_MATCH) as (keyof typeof VARIANT_MATCH)[]).map(
        buttonV1Variant => (
          <Table.Row>
            <Table.BodyCell>
              <Button variant={buttonV1Variant}>
                variant : {buttonV1Variant}
              </Button>
            </Table.BodyCell>
            <Table.BodyCell>
              <ButtonV2
                variant={VARIANT_MATCH[buttonV1Variant].variant}
                sentiment={VARIANT_MATCH[buttonV1Variant].sentiment}
                onClick={MOCK_ONCLICK}
              >
                variant : {VARIANT_MATCH[buttonV1Variant].variant} + sentiment :{' '}
                {VARIANT_MATCH[buttonV1Variant].sentiment}
              </ButtonV2>
            </Table.BodyCell>
          </Table.Row>
        ),
      )}
    </Table.Body>
  </Table>
)

export default Variants
