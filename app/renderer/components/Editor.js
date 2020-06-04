import styled from 'styled-components'
import React, { useCallback, useState, useRef } from 'react'

import Button from '../components/Button'
import Input from '../components/Input'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  height: 100%;
`

const Video = styled.video`
  -webkit-app-region: no-drag;
  max-height: 100%;
  max-width: 100%;
`

const CloseButtonRegion = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
`

const TimeRegion = styled.div`
  margin-top: 30px;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
`

const TimePanel = styled.div`
  display: flex;
  margin: 5px 10px;

  ${Button} {
    margin-left: 5px;
  }
`

const Editor = ({ filePath, onClose, onSave }) => {
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const [sectionNum, setSectionNum] = useState('')
  const [secondNum, setSecondNum] = useState('')
  //const [duration, setDuration] = useState('')



  const videoRef = useRef(null)
  //const duration = videoRef.duration
  //console.log(videoRef.duration)
  const close = useCallback(() => onClose(), [onClose])
  const handleChangeStartTime = useCallback((event) => setStartTime(event.target.value), [])
  const handleChangeEndTime = useCallback((event) => setEndTime(event.target.value), [])

  const handleChangeSection = useCallback((event) => setSectionNum(event.target.value), [])
  const handleChangeSecond = useCallback((event) => setSecondNum(event.target.value), [])


  const save = useCallback(() => {
    const start = parseInt(startTime, 10)
    const end = parseInt(endTime, 10)
    const section = parseInt(sectionNum, 10)
    const second = parseInt(secondNum, 10)
    console.log(videoRef)
    const duration = videoRef.current.duration //parseInt(videoRef.duration, 10)

    //const videoRef = useRef(null)
    //const duration = videoRef.duration
    console.log('duration')
    console.log(duration)

    if (Number.isNaN(start) || start < 0) {
      console.error('输入时间不合法', { start, end })
      return
    }

    if (Number.isNaN(end) || end <= start) {
      console.error('输入时间不合法，不能大于开始时间', { start, end })
      return
    }

    onSave(start, end, section, second, duration)
  }, [startTime, endTime, sectionNum, secondNum, videoRef, onSave])

  const setCurrentTimeStart = useCallback(() => {
    setStartTime(Math.round(videoRef.current.currentTime))
  }, [videoRef])

  const setCurrentTimeEnd = useCallback(() => {
    setEndTime(Math.round(videoRef.current.currentTime))
  }, [videoRef])

  // const setCurrentSection = useCallback(() => {
  //   setEndTime(Math.round(videoRef.current.currentTime))
  // }, [videoRef])

  return (
    <Container>
      <Video ref={videoRef} src={`file:///${filePath}`} controls />
      <TimeRegion>
        <TimePanel>
          <Input placeholder="Start time" onChange={handleChangeStartTime} value={startTime}/>
          <Button onClick={setCurrentTimeStart} size="small">Current Time</Button>
        </TimePanel>
        <TimePanel>
          <Input placeholder="End time" onChange={handleChangeEndTime} value={endTime}/>
          <Button onClick={setCurrentTimeEnd} size="small">Current Time</Button>
        </TimePanel>

        <TimePanel>
          <Input placeholder="段数" onChange={handleChangeSection} value={sectionNum}/>
          {/* <Button onClick={setCurrentSection} size="small">Current Time</Button> */}
        </TimePanel>

        <TimePanel>
          <Input placeholder="秒数" onChange={handleChangeSecond} value={secondNum}/>
          {/* <Button onClick={setCurrentTimeEnd} size="small">Current Time</Button> */}
        </TimePanel>


        <TimePanel><Button onClick={save}>Save</Button></TimePanel>
      </TimeRegion>
      <CloseButtonRegion>
        <Button onClick={close}>Close</Button>
      </CloseButtonRegion>
    </Container>
  )
}

export default React.memo(Editor)
