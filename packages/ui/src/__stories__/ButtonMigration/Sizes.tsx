import type { ComponentProps } from 'react'
import { Button, ButtonV2, Table } from '../../components'

const MOCK_ONCLICK = () => {}

const SIZE_MATCH: Record<
  Required<ComponentProps<typeof Button>>['size'],
  Required<ComponentProps<typeof ButtonV2>>['size']
> = {
  large: 'large',
  medium: 'medium',
  small: 'small',
  xsmall: 'small',
  xxsmall: 'small',
}

export const Sizes = () => (
  <Table>
    <Table.Head>
      <Table.HeadCell>Button V1 size</Table.HeadCell>
      <Table.HeadCell>Button V2 size</Table.HeadCell>
    </Table.Head>
    <Table.Body>
      {(Object.keys(SIZE_MATCH) as (keyof typeof SIZE_MATCH)[]).map(
        buttonV1Size => (
          <Table.Row key={buttonV1Size}>
            <Table.BodyCell>
              <Button size={buttonV1Size}>{buttonV1Size}</Button>
            </Table.BodyCell>
            <Table.BodyCell>
              <ButtonV2 size={SIZE_MATCH[buttonV1Size]} onClick={MOCK_ONCLICK}>
                {SIZE_MATCH[buttonV1Size]}
              </ButtonV2>
            </Table.BodyCell>
          </Table.Row>
        ),
      )}
    </Table.Body>
  </Table>
)
