// oxlint-disable typescript/no-unsafe-type-assertion
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'

import { FileInput } from '..'
import { FilesType } from '../types'

const defaultFile = [
  {
    file: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Photo_Chat_Noir_et_blanc.jpg',
    fileName: 'cat.png',
    lastModified: 1,
    size: 30_460,
    type: 'image/png',
  },
  {
    error: 'Maximum file size exceeded',
    file: 'error.png',
    fileName: 'error_example.png',
    lastModified: 1,
    size: 4_046_000_000,
    type: 'image/png',
  },
  {
    file: 'sound.mp3',
    fileName: 'sound.mp3',
    lastModified: 1,
    size: 0,
    type: 'audio/mp3',
  },
  {
    file: 'doc.pdf',
    fileName: 'doc.pdf',
    lastModified: 1,
    size: 304_600,
    type: 'application/pdf',
  },
  {
    file: 'video.mp4',
    fileName: 'video.mp4',
    lastModified: 1,
    size: 40_460_000,
    type: 'video/png',
  },
  {
    file: 'loading.pdf',
    fileName: 'loading_example.pdf',
    lastModified: 1,
    loading: true,
    size: 40_460_000,
    type: 'application/pdf',
  },
]

describe('fileInput', () => {
  test('renders correctly', () => {
    const { asFragment } = renderWithTheme(
      <FileInput helper="helper" label="label" title="title" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  test('renders correctly as an overlay', () => {
    const { asFragment } = renderWithTheme(
      <FileInput label="label" title="title" variant="overlay">
        test
      </FileInput>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  test('renders correctly small', () => {
    const { asFragment } = renderWithTheme(
      <FileInput label="label" size="small" title="title" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with multiple and list', () => {
    const { asFragment } = renderWithTheme(
      <FileInput aria-label="label" defaultFiles={defaultFile} multiple>
        <FileInput.List />
      </FileInput>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with multiple and list - empty', () => {
    const { asFragment } = renderWithTheme(
      <FileInput aria-label="label" multiple>
        <FileInput.List />
      </FileInput>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with bottom', () => {
    const { asFragment } = renderWithTheme(
      <FileInput aria-label="label" bottom={<FileInput.List />} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly disabled', () => {
    const { asFragment } = renderWithTheme(
      <FileInput aria-label="label" disabled>
        <FileInput.Button data-testid="button">
          Disabled button
        </FileInput.Button>
      </FileInput>,
    )

    expect(screen.getByTestId('button')).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with error', () => {
    const { asFragment } = renderWithTheme(
      <FileInput
        aria-label="label"
        defaultFiles={defaultFile}
        disabled
        error="error"
      >
        <FileInput.Button data-testid="button">
          Disabled button
        </FileInput.Button>
      </FileInput>,
    )

    expect(screen.getByTestId('button')).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly onChange', async () => {
    const onChange = vi.fn<(files: FileList) => void>()
    const onDelete = vi.fn<(name: string) => void>()

    const { asFragment } = renderWithTheme(
      <FileInput
        aria-label="label"
        defaultFiles={defaultFile}
        multiple
        onChange={onChange}
      >
        <FileInput.List onDelete={onDelete} />
      </FileInput>,
    )

    const soundMp3File = screen.getByTestId('sound.mp3')
    const closeButton = screen.getByTestId('remove-sound.mp3')

    expect(soundMp3File).toBeInTheDocument()
    await userEvent.click(closeButton)
    expect(soundMp3File).not.toBeInTheDocument()
    expect(onDelete).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly onChangeFiles', async () => {
    const onChange = vi.fn<(files: FilesType[]) => void>()
    const { asFragment } = renderWithTheme(
      <FileInput
        aria-label="label"
        defaultFiles={defaultFile}
        multiple
        onChangeFiles={onChange}
      >
        <FileInput.List />
      </FileInput>,
    )

    const soundMp3File = screen.getByTestId('sound.mp3')
    const closeButton = screen.getByTestId('remove-sound.mp3')

    expect(soundMp3File).toBeInTheDocument()
    await userEvent.click(closeButton)
    expect(soundMp3File).not.toBeInTheDocument()
    expect(onChange).toHaveBeenCalled()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should work correctly with listLimit', async () => {
    const onChange = vi.fn<(files: FilesType[]) => void>()
    const { asFragment } = renderWithTheme(
      <FileInput
        aria-label="label"
        defaultFiles={defaultFile}
        multiple
        onChangeFiles={onChange}
      >
        <FileInput.List limit={3} textLimit="see all" />
      </FileInput>,
    )

    const nonOverflowedElement = screen.getByTestId('sound.mp3')

    expect(screen.queryByTestId('video.mp4')).not.toBeInTheDocument()
    expect(nonOverflowedElement).toBeInTheDocument()

    const seeAllButton = screen.getByTestId('see-all')
    await userEvent.click(seeAllButton)

    expect(screen.getByTestId('video.mp4')).toBeInTheDocument()
    expect(nonOverflowedElement).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with FileInput.Button', () => {
    const onChange = vi.fn<(files: FilesType[]) => void>()

    const { asFragment } = renderWithTheme(
      <FileInput
        aria-label="label"
        defaultFiles={defaultFile}
        multiple
        onChangeFiles={onChange}
      >
        <FileInput.List />
        <FileInput.Button>button</FileInput.Button>
      </FileInput>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should throw error with FileInput.Button outside of FileInput', () => {
    expect(() =>
      shouldMatchSnapshot(<FileInput.Button>button</FileInput.Button>),
    ).toThrow('FileInputContext should be inside FileInput to work properly.')
  })

  test('should work with function children and title', () => {
    const onChange = vi.fn<(files: FilesType[]) => void>()
    const { asFragment } = renderWithTheme(
      <FileInput
        aria-label="label"
        defaultFiles={defaultFile}
        multiple
        onChangeFiles={onChange}
        title={(inputId, inputRef) => (
          <>
            <FileInput.List />
            <label htmlFor={inputId}>title</label>
            <button onClick={() => inputRef.current?.click()} type="button">
              button
            </button>
          </>
        )}
      >
        {(inputId, inputRef) => (
          <>
            <label htmlFor={inputId}>title</label>
            <button onClick={() => inputRef.current?.click()} type="button">
              button
            </button>
          </>
        )}
      </FileInput>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly ondrop, ondrag', () => {
    const onChange = vi.fn<(files: FilesType[]) => void>()
    const { asFragment } = renderWithTheme(
      <FileInput
        aria-label="label"
        defaultFiles={defaultFile}
        multiple
        onChangeFiles={onChange}
        title="dragging"
        variant="overlay"
      >
        <FileInput.List />
        nodrag
      </FileInput>,
    )

    const defaultcontent = screen.getByText('nodrag')
    const dragContainer = screen.getByTestId('drag-container')
    fireEvent.dragOver(dragContainer)
    fireEvent.drop(dragContainer)
    expect(defaultcontent).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly when drag and drop disabled', () => {
    const onChange = vi.fn<(files: FilesType[]) => void>()
    const { asFragment } = renderWithTheme(
      <FileInput
        aria-label="label"
        defaultFiles={defaultFile}
        multiple
        onChangeFiles={onChange}
        title="dragging"
        variant="overlay"
        disabledDragndrop
      >
        <FileInput.List />
        nodrag
      </FileInput>,
    )

    const defaultcontent = screen.getByText('nodrag')
    fireEvent.dragOver(defaultcontent)
    expect(defaultcontent).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should handle drag state in dropzone variant', () => {
    const { asFragment } = renderWithTheme(
      <FileInput aria-label="label" title="upload files" variant="dropzone" />,
    )

    const dropzoneElement = screen.getByTestId('drag-container')
    fireEvent.dragOver(dropzoneElement)
    fireEvent.drop(dropzoneElement)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should handle adding a file when selecting via the hidden file input', async () => {
    const onChangeFiles = vi.fn<(files: FilesType[]) => void>()
    const { asFragment } = renderWithTheme(
      <FileInput
        aria-label="label"
        data-testid="test"
        onChangeFiles={onChangeFiles}
      >
        <FileInput.List />
      </FileInput>,
    )

    const input = screen.getByTestId('test')

    const file = new File(['hello'], 'upload.png', { type: 'application/pdf' })
    await userEvent.upload(input, file)

    expect(onChangeFiles).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ fileName: 'upload.png' }),
      ]),
    )

    const added = screen.getByTestId('upload.png')
    expect(added).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should add a file with drag and drop', () => {
    const onChangeFiles = vi.fn<(files: FilesType[]) => void>()
    renderWithTheme(
      <FileInput
        accept="image/*"
        aria-label="label"
        onChangeFiles={onChangeFiles}
      >
        <FileInput.List />
      </FileInput>,
    )

    const dropzone = screen.getByTestId('drag-container')
    const file = new File(['dnd'], 'dnd.png', { type: 'image/png' })

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
        items: [],
        types: ['Files'],
      },
    } as unknown as DragEvent)

    expect(onChangeFiles).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ fileName: 'dnd.png' }),
      ]),
    )

    const added = screen.getByTestId('dnd.png')
    expect(added).toBeInTheDocument()
  })

  test('should add a file with drag and drop which when accept is defined', () => {
    const onChangeFiles = vi.fn<(files: FilesType[]) => void>()
    renderWithTheme(
      <FileInput
        accept="image/*"
        aria-label="label"
        onChangeFiles={onChangeFiles}
      />,
    )

    const dropzone = screen.getByTestId('drag-container')
    const file = new File(['dnd'], 'dnd.png', { type: 'image/png' })
    const filePdf = new File(['not-added'], 'not-added.pdf', {
      type: 'application/pdf',
    })

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
        items: [],
        types: ['Files'],
      },
    } as unknown as DragEvent)

    expect(onChangeFiles).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ fileName: 'dnd.png' }),
      ]),
    )

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [filePdf],
        items: [],
        types: ['Files'],
      },
    } as unknown as DragEvent)

    expect(onChangeFiles).not.toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ fileName: 'not-added.pdf' }),
      ]),
    )
  })

  test('should add a file with drag and drop which when accept is defined and precise', () => {
    const onChangeFiles = vi.fn<(files: FilesType[]) => void>()
    renderWithTheme(
      <FileInput
        accept="image/png, .mp3"
        aria-label="label"
        onChangeFiles={onChangeFiles}
      />,
    )

    const dropzone = screen.getByTestId('drag-container')
    const file = new File(['dnd'], 'dnd.png', { type: 'image/png' })
    const fileJpg = new File(['dnd'], 'dnd.jpg', { type: 'image/jpg' })
    const filePdf = new File(['not-added'], 'not-added.pdf', {
      type: 'application/pdf',
    })
    const filemp3 = new File(['added'], 'added.mp3', {
      type: 'application/pdf',
    })

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
        items: [],
        types: ['Files'],
      },
    } as unknown as DragEvent)

    expect(onChangeFiles).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ fileName: 'dnd.png' }),
      ]),
    )

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [filePdf],
        items: [],
        types: ['Files'],
      },
    } as unknown as DragEvent)

    expect(onChangeFiles).not.toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ fileName: 'not-added.pdf' }),
      ]),
    )

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [fileJpg],
        items: [],
        types: ['Files'],
      },
    } as unknown as DragEvent)

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [filemp3],
        items: [],
        types: ['Files'],
      },
    } as unknown as DragEvent)

    expect(onChangeFiles).not.toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ fileName: 'dnd.jpg' }),
        expect.objectContaining({ fileName: 'added.mp3' }),
      ]),
    )
  })

  test('should add a file with drag and drop which when accept but not valid', () => {
    const onChangeFiles = vi.fn<(files: FilesType[]) => void>()
    renderWithTheme(
      <FileInput accept=" " aria-label="label" onChangeFiles={onChangeFiles} />,
    )

    const dropzone = screen.getByTestId('drag-container')
    const file = new File(['dnd'], 'dnd.png', { type: 'image/png' })

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
        items: [],
        types: ['Files'],
      },
    } as unknown as DragEvent)

    expect(onChangeFiles).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ fileName: 'dnd.png' }),
      ]),
    )
  })

  test('should add files from dropped directory with allowDirectories', async () => {
    const onChangeFiles = vi.fn<(files: FilesType[]) => void>()
    renderWithTheme(
      <FileInput
        aria-label="label"
        onChangeFiles={onChangeFiles}
        allowDirectories
        bottom={<FileInput.List />}
        size="small"
        title="title"
      />,
    )

    const dropzone = screen.getByRole('button', { name: 'UploadIcon title' })
    const dirFile = new File(['content1'], 'dir/file1.png', {
      type: 'image/png',
    })
    const singleFile = new File(['content2'], 'single.png', {
      type: 'image/png',
    })

    let callCount = 0
    const dirFileEntry = {
      isFile: true,
      isDirectory: false,
      file: (success: (file: File) => void) => success(dirFile),
    } as unknown as FileSystemFileEntry

    const directoryEntry = {
      isFile: false,
      isDirectory: true,
      name: 'dir',
      createReader: () => ({
        readEntries: (resolve: (entries: FileSystemEntry[]) => void) => {
          if (callCount === 0) {
            callCount += 1
            resolve([dirFileEntry])
          } else {
            resolve([])
          }
        },
      }),
    } as unknown as FileSystemDirectoryEntry

    const dirItem = {
      kind: 'file',
      type: dirFile.type,
      webkitGetAsEntry: () => directoryEntry,
    } as unknown as DataTransferItem

    const singleFileEntry = {
      isFile: true,
      isDirectory: false,
      file: (success: (file: File) => void) => success(singleFile),
    } as unknown as FileSystemFileEntry

    const singleItem = {
      kind: 'file',
      type: singleFile.type,
      webkitGetAsEntry: () => singleFileEntry,
    } as unknown as DataTransferItem

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [dirFile, singleFile],
        items: [dirItem, singleItem],
        types: ['Files'],
      },
    } as unknown as DragEvent)

    await waitFor(() => {
      expect(onChangeFiles).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ fileName: 'dir/file1.png' }),
          expect.objectContaining({ fileName: 'single.png' }),
        ]),
      )
    })
  })
})
