import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { SelectableCardOptionGroup } from '..'
import centos from '../__stories__/assets/centos.svg'
import debian from '../__stories__/assets/debian.svg'
import ubuntu from '../__stories__/assets/ubuntu.svg'
import {
  centosOptions,
  debianOptions,
  ubuntuOptions,
} from '../__stories__/constants'

describe('selectableCardOptionGroup', () => {
  test('renders correctly', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        legend="Select your OS"
        onChange={() => {}}
        onChangeOption={() => {}}
        optionValue="ubuntu-20.04"
        value="ubuntu"
      >
        <SelectableCardOptionGroup.Option
          image={ubuntu}
          label="Ubuntu"
          options={ubuntuOptions}
          value="ubuntu"
        />
        <SelectableCardOptionGroup.Option
          image={debian}
          label="Debian"
          options={debianOptions}
          value="debian"
        />
        <SelectableCardOptionGroup.Option
          image={centos}
          label="CentOS"
          options={centosOptions}
          value="centos"
        />
      </SelectableCardOptionGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with medium size', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        onChange={() => {}}
        onChangeOption={() => {}}
        optionValue="ubuntu-20.04"
        size="medium"
        value="ubuntu"
      >
        <SelectableCardOptionGroup.Option
          image={ubuntu}
          label="Ubuntu"
          options={ubuntuOptions}
          value="ubuntu"
        />
        <SelectableCardOptionGroup.Option
          image={debian}
          label="Debian"
          options={debianOptions}
          value="debian"
        />
        <SelectableCardOptionGroup.Option
          image={centos}
          label="CentOS"
          options={centosOptions}
          value="centos"
        />
      </SelectableCardOptionGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with aria-label', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        aria-label="Select your OS"
        onChange={() => {}}
        onChangeOption={() => {}}
        optionValue="ubuntu-20.04"
        size="medium"
        value="ubuntu"
      >
        <SelectableCardOptionGroup.Option
          aria-label="Ubuntu"
          image={ubuntu}
          options={ubuntuOptions}
          value="ubuntu"
        />
        <SelectableCardOptionGroup.Option
          aria-label="Debian"
          image={debian}
          options={debianOptions}
          value="debian"
        />
        <SelectableCardOptionGroup.Option
          aria-label="CentOS"
          image={centos}
          options={centosOptions}
          value="centos"
        />
      </SelectableCardOptionGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with id', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        onChange={() => {}}
        onChangeOption={() => {}}
        optionValue="ubuntu-20.04"
        size="medium"
        value="ubuntu"
      >
        <SelectableCardOptionGroup.Option
          id="ubuntu-option"
          image={ubuntu}
          label="Ubuntu"
          options={ubuntuOptions}
          value="ubuntu"
        />
        <SelectableCardOptionGroup.Option
          id="debian-option"
          image={debian}
          label="Debian"
          options={debianOptions}
          value="debian"
        />
        <SelectableCardOptionGroup.Option
          id="centos-option"
          image={centos}
          label="CentOS"
          options={centosOptions}
          value="centos"
        />
      </SelectableCardOptionGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with all options disabled', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        disabled
        onChange={() => {}}
        onChangeOption={() => {}}
        optionValue="ubuntu-20.04"
        value="ubuntu"
      >
        <SelectableCardOptionGroup.Option
          image={ubuntu}
          label="Ubuntu"
          options={ubuntuOptions}
          value="ubuntu"
        />
        <SelectableCardOptionGroup.Option
          image={debian}
          label="Debian"
          options={debianOptions}
          value="debian"
        />
        <SelectableCardOptionGroup.Option
          image={centos}
          label="CentOS"
          options={centosOptions}
          value="centos"
        />
      </SelectableCardOptionGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with partial disabled', async () => {
    const onChange = vi.fn()
    const onChangeOption = vi.fn()

    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        onChange={onChange}
        onChangeOption={onChangeOption}
        optionValue="ubuntu-20.04"
        value="ubuntu"
      >
        <SelectableCardOptionGroup.Option
          image={ubuntu}
          label="Ubuntu"
          options={ubuntuOptions}
          value="ubuntu"
        />
        <SelectableCardOptionGroup.Option
          disabled
          image={debian}
          label="Debian"
          options={debianOptions}
          value="debian"
        />
        <SelectableCardOptionGroup.Option
          image={centos}
          label="CentOS"
          options={centosOptions}
          value="centos"
        />
      </SelectableCardOptionGroup>,
    )

    await userEvent.click(screen.getByLabelText('Debian'))
    expect(onChange).toHaveBeenCalledTimes(0)

    await userEvent.click(screen.getByLabelText('Debian option'))
    expect(onChangeOption).toHaveBeenCalledTimes(0)

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with error message', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        error="Error message"
        onChange={() => {}}
        onChangeOption={() => {}}
        optionValue="ubuntu-20.04"
        value="ubuntu"
      >
        <SelectableCardOptionGroup.Option
          image={ubuntu}
          label="Ubuntu"
          options={ubuntuOptions}
          value="ubuntu"
        />
        <SelectableCardOptionGroup.Option
          image={debian}
          label="Debian"
          options={debianOptions}
          value="debian"
        />
        <SelectableCardOptionGroup.Option
          image={centos}
          label="CentOS"
          options={centosOptions}
          value="centos"
        />
      </SelectableCardOptionGroup>,
    )
    expect(screen.getByText('Error message')).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with error as boolean', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        error
        onChange={() => {}}
        onChangeOption={() => {}}
        optionValue="ubuntu-20.04"
        value="ubuntu"
      >
        <SelectableCardOptionGroup.Option
          image={ubuntu}
          label="Ubuntu"
          options={ubuntuOptions}
          value="ubuntu"
        />
        <SelectableCardOptionGroup.Option
          image={debian}
          label="Debian"
          options={debianOptions}
          value="debian"
        />
        <SelectableCardOptionGroup.Option
          image={centos}
          label="CentOS"
          options={centosOptions}
          value="centos"
        />
      </SelectableCardOptionGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with image as ReactNode', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        onChange={() => {}}
        onChangeOption={() => {}}
        optionValue="ubuntu-20.04"
        value="ubuntu"
      >
        <SelectableCardOptionGroup.Option
          image={<img alt="Ubuntu" src={ubuntu} />}
          label="Ubuntu"
          options={ubuntuOptions}
          value="ubuntu"
        />
        <SelectableCardOptionGroup.Option
          image={<img alt="Debian" src={debian} />}
          label="Debian"
          options={debianOptions}
          value="debian"
        />
        <SelectableCardOptionGroup.Option
          image={<img alt="CentOS" src={centos} />}
          label="CentOS"
          options={centosOptions}
          value="centos"
        />
      </SelectableCardOptionGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly 4 columns', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        columns={4}
        onChange={() => {}}
        onChangeOption={() => {}}
        optionValue="ubuntu-20.04"
        value="ubuntu"
      >
        <SelectableCardOptionGroup.Option
          image={ubuntu}
          label="Ubuntu"
          options={ubuntuOptions}
          value="ubuntu"
        />
        <SelectableCardOptionGroup.Option
          image={debian}
          label="Debian"
          options={debianOptions}
          value="debian"
        />
        <SelectableCardOptionGroup.Option
          image={centos}
          label="CentOS"
          options={centosOptions}
          value="centos"
        />
      </SelectableCardOptionGroup>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with helper', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        helper="Helper message"
        onChange={() => {}}
        onChangeOption={() => {}}
        optionValue="ubuntu-20.04"
        value="ubuntu"
      >
        <SelectableCardOptionGroup.Option
          image={ubuntu}
          label="Ubuntu"
          options={ubuntuOptions}
          value="ubuntu"
        />
        <SelectableCardOptionGroup.Option
          image={debian}
          label="Debian"
          options={debianOptions}
          value="debian"
        />
        <SelectableCardOptionGroup.Option
          image={centos}
          label="CentOS"
          options={centosOptions}
          value="centos"
        />
      </SelectableCardOptionGroup>,
    )
    expect(screen.getByText('Helper message')).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('onChange and onChangeOption are being called', async () => {
    const onChange = vi.fn()
    const onChangeOption = vi.fn()

    const { asFragment } = renderWithTheme(
      <SelectableCardOptionGroup
        onChange={onChange}
        onChangeOption={onChangeOption}
        optionValue="ubuntu-20.04"
        value="ubuntu"
      >
        <SelectableCardOptionGroup.Option
          image={ubuntu}
          label="Ubuntu"
          options={ubuntuOptions}
          value="ubuntu"
        />
        <SelectableCardOptionGroup.Option
          image={debian}
          label="Debian"
          options={debianOptions}
          value="debian"
        />
        <SelectableCardOptionGroup.Option
          image={centos}
          label="CentOS"
          options={centosOptions}
          value="centos"
        />
      </SelectableCardOptionGroup>,
    )

    await userEvent.click(screen.getByLabelText('Debian'))
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledOnce()
    })

    await userEvent.click(screen.getByLabelText('Debian option'))

    expect(asFragment()).toMatchSnapshot()
  })

  test('tabulation works in correct order selectable card > select input', async () => {
    renderWithTheme(
      <SelectableCardOptionGroup
        onChange={() => {}}
        onChangeOption={() => {}}
        optionValue="ubuntu-20.04"
        value="ubuntu"
      >
        <SelectableCardOptionGroup.Option
          image={ubuntu}
          label="Ubuntu"
          options={ubuntuOptions}
          value="ubuntu"
        />
      </SelectableCardOptionGroup>,
    )

    await userEvent.keyboard('{tab}')
    expect(screen.getByRole('button')).toHaveFocus() // This is the selectable card

    await userEvent.keyboard('{tab}')
    expect(screen.getByRole('combobox')).toHaveFocus() // This is the select input
  })
})
