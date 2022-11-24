import ProgressionButton from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('ProgressionButton', () => {
  it('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(
      <ProgressionButton>Progression</ProgressionButton>,
    ))

  it('renders correctly with a string as creation date', () =>
    shouldMatchEmotionSnapshot(
      <ProgressionButton creation={new Date().toString()}>
        Progression
      </ProgressionButton>,
    ))

  it('renders correctly with a duration subceeding its creation date', () =>
    shouldMatchEmotionSnapshot(
      <ProgressionButton
        creation={new Date(new Date().setSeconds(new Date().getSeconds() - 90))}
        duration={10}
      >
        Progression
      </ProgressionButton>,
    ))

  it('renders correctly with a duration exceeding its creation date', () =>
    shouldMatchEmotionSnapshot(
      <ProgressionButton
        creation={new Date(new Date().setSeconds(new Date().getSeconds() + 90))}
        duration={10}
      >
        Progression
      </ProgressionButton>,
    ))
})
