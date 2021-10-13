import React from 'react'
import Table from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Table', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.BodyCell>165</Table.BodyCell>
            <Table.BodyCell>Ongoing</Table.BodyCell>
            <Table.BodyCell>Yesterday</Table.BodyCell>
          </Table.Row>
          <Table.Row>
            <Table.BodyCell>56</Table.BodyCell>
            <Table.BodyCell>Resolved</Table.BodyCell>
            <Table.BodyCell>1 hour ago</Table.BodyCell>
          </Table.Row>
        </Table.Body>
      </Table>,
    ))

  test('renders correctly while loading', () =>
    shouldMatchEmotionSnapshot(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body loading colSpan={2}>
          <Table.Row>
            <Table.BodyCell>999</Table.BodyCell>
            <Table.BodyCell>Just now</Table.BodyCell>
          </Table.Row>
        </Table.Body>
      </Table>,
    ))
})
