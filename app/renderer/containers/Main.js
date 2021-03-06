import styled from 'styled-components'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as actions from '../actions'
import * as helpers from '../helpers'
import * as selectors from '../selectors'
import Button from '../components/Button'
import Editor from '../components/Editor'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  height: 100%;
`

const H2 = styled.h2`
  width: 100%;
  text-align: center;
  margin-top: 0;
`


const Main = () => {
  const dispatch = useDispatch()
  const filePath = useSelector(selectors.file.getPath)

  const openFile = useCallback(() => {
    helpers.dom.selectFiles(([file]) => dispatch(actions.file.add(file)), { accept: '.mp4,.avi' })
  }, [])

  const closeEditor = useCallback(() => {
    dispatch(actions.file.clear())
  }, [])

  const saveVideo = useCallback((start, end) => {
    console.debug('Сохранение видео', {
      filePath,
      start,
      end,
    })
    dispatch(actions.file.save(start, end))
  }, [])

  if (filePath) {
    return (
      <Editor filePath={filePath} onClose={closeEditor} onSave={saveVideo} />
    )
  }

  return (
    <Container>
      <H2>Choose file for cut</H2>
      <Button onClick={openFile}>Open</Button>
    </Container>
  )
}

export default Main
