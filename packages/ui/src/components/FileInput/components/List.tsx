import { AudioIcon } from '@ultraviolet/icons/AudioIcon'
import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import { DocIcon } from '@ultraviolet/icons/DocIcon'
import { ImageIcon } from '@ultraviolet/icons/ImageIcon'
import { VideoIcon } from '@ultraviolet/icons/VideoIcon'
import { useState } from 'react'
import { Button } from '../../Button'
import { Loader } from '../../Loader'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { useFileInput } from '../FileInputProvider'
import { formatFileSize, getMimeTypeType } from '../helpers'
import type { ListProps, MimeType } from '../types'
import { fileInputStyle } from '../styles.css'

const getIllustration = (type: MimeType, error: boolean, loading: boolean, file?: string) => {
  const state = error ? 'error' : 'default'
  const sentiment = error ? 'danger' : 'primary'

  if (loading) {
    return (
      <div className={fileInputStyle.fileViewerImage[state]}>
        <Loader active sentiment="primary" size="xsmall" />
      </div>
    )
  }
  if (type === 'audio') {
    return (
      <div className={fileInputStyle.fileViewerImage[state]}>
        <AudioIcon sentiment={sentiment} size="medium" />
      </div>
    )
  }
  if (type === 'video') {
    return (
      <div className={fileInputStyle.fileViewerImage[state]}>
        <VideoIcon sentiment={sentiment} size="medium" />
      </div>
    )
  }
  if (type === 'image') {
    return !error && file ? (
      <img alt="" className={fileInputStyle.fileViewerImage.default} height="auto" src={file} width="auto" />
    ) : (
      <div className={fileInputStyle.fileViewerImage[state]}>
        <ImageIcon sentiment={sentiment} size="medium" />
      </div>
    )
  }

  return (
    <div className={fileInputStyle.fileViewerImage[state]}>
      <DocIcon sentiment={sentiment} size="medium" />
    </div>
  )
}

export const ListFiles = ({ limit, textLimit, prominence = 'default', onDelete }: ListProps) => {
  const [computedLimit, setLimit] = useState(limit)
  const seeAllOnClick = () => {
    setLimit(undefined)
  }
  const { files, setFiles, onChangeFiles, error } = useFileInput()

  return files.length > 0 ? (
    <Stack direction="row" gap={1} wrap="wrap" as="ul" className={fileInputStyle.fileListContainer}>
      {files.map((file, index) => {
        if (!computedLimit || index < computedLimit) {
          const fileType = getMimeTypeType(file.type)
          const illustration = getIllustration(fileType, !!file.error || error, !!file.loading, file.file)
          const sentiment = file.error ? 'danger' : 'neutral'

          return (
            <Stack data-testid={file.name} gap={0.5} key={`${file.name}-${file.size}`} as="li">
              <Stack
                alignItems="center"
                className={fileInputStyle.fileViewerContainer[file.error || error ? 'error' : prominence]}
                direction="row"
                gap={2}
                justifyContent="center"
              >
                <Stack alignItems="center" direction="row" gap={1}>
                  {illustration}
                  <Stack className={fileInputStyle.fileInfo} direction="column">
                    <Text as="p" oneLine sentiment={sentiment} variant="bodySmallStrong">
                      {file.name}
                    </Text>
                    <Text as="p" sentiment={sentiment} variant="caption">
                      {formatFileSize(file.size)}
                    </Text>
                  </Stack>
                </Stack>
                <Button
                  data-testid={`remove-${file.name}`}
                  onClick={() => {
                    const newFiles = files.filter(oldFile => file.file !== oldFile.file)
                    setFiles(newFiles)
                    onChangeFiles?.(newFiles)
                    onDelete?.(file.name)
                  }}
                  sentiment={sentiment}
                  size="xsmall"
                  variant="ghost"
                >
                  <CloseIcon />
                </Button>
              </Stack>
              {file.error ? (
                <Text as="p" sentiment="danger" variant="caption">
                  {file.error}
                </Text>
              ) : null}
            </Stack>
          )
        }

        return null
      })}
      {computedLimit && files.length > computedLimit ? (
        <Button data-testid="see-all" onClick={seeAllOnClick} sentiment="primary" size="large" variant="ghost">
          {textLimit} ({files.length - (limit ?? 0)})
        </Button>
      ) : null}
    </Stack>
  ) : null
}

ListFiles.displayName = 'FileInput.List'
