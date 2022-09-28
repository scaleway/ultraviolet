import Icon, { icons } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Icon', () => {
  icons.forEach(icon => {
    test(`render ${icon}`, () =>
      shouldMatchEmotionSnapshot(<Icon name={icon} />))
  })

  test(`render Icon default params`, () => shouldMatchEmotionSnapshot(<Icon />))

  test(`render Icon with custom size`, () =>
    shouldMatchEmotionSnapshot(<Icon size={32} />))

  test(`render Icon with color and prominence default`, () =>
    shouldMatchEmotionSnapshot(
      <Icon name="circle" color="neutral" prominence="default" />,
    ))

  test(`render Icon with color and prominence weak`, () =>
    shouldMatchEmotionSnapshot(
      <Icon name="circle" color="neutral" prominence="weak" />,
    ))

  test(`render Icon with color other than neutral and prominence stronger (should render default prominence)`, () =>
    shouldMatchEmotionSnapshot(
      <Icon name="circle" color="primary" prominence="stronger" />,
    ))

  test(`render unknow`, () =>
    shouldMatchEmotionSnapshot(<Icon name="unknown" />))
})
