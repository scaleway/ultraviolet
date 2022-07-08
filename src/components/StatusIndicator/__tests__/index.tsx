import StatusIndicator from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

const statuses = [
  'available',
  'creating',
  'deleting',
  'deployed',
  'disk_full',
  'error',
  'locked',
  'pending',
  'ready',
  'running',
  'snapshotting',
  'starting',
  'stopped',
  'stopped_in_place',
  'stopping',
  'unavailable',
  'updating',
  'warning',
]

describe('StatusIndicator', () => {
  statuses.forEach(status => {
    test(`render ${status}`, () =>
      shouldMatchEmotionSnapshot(<StatusIndicator status={status} />))
  })

  test(`render unknow`, async () =>
    shouldMatchEmotionSnapshot(<StatusIndicator status="unknow" />))

  test(`render animated`, () =>
    shouldMatchEmotionSnapshot(
      <StatusIndicator status={statuses[0]} animated />,
    ))
})
