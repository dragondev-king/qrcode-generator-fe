import { useState, useCallback } from "react"
import { Container, Paper, TextField, Button, InputLabel, Select, MenuItem } from "@material-ui/core"
import { saveAs } from 'file-saver'
import { CompactPicker } from 'react-color'

import QRDisplayer from "../../components/QRDisplayer"
import { getData } from "../../api/call"
import './style.css'

const urlPatternValidation = URL => {
  const regex = new RegExp('(http?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
  return regex.test(URL);
};

const QRs = () => {
  const [url, setUrl] = useState('')
  const [type, setType] = useState('png')
  const [imageURL, setImageURL] = useState('')
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')
  const [color, setColor] = useState('#000')
  
  const handleURLChange = useCallback((e) => {
    setUrl(e.target.value)
  }, [])

  const handleGenerateClick = useCallback(() => {
    if(urlPatternValidation(url) === false) {
      setIsError(true)
      setMessage("Enter the valid url")
      return
    }
    setIsError(false)
    setMessage('')
    getData({
      url: '/',
      Headers: {
        'content-type': ['image/png', 'image/jpeg', 'image/svg'],
      },
      params: {
        content: url,
        type,
        color
      }
    })
    .then((data) => {
      setImageURL(data?.url)
    })
  }, [url, setImageURL, type, color])

  const handleTypeChange = useCallback((e) => {
    setType(e.target.value)
  }, [])

  const handleResetClick = useCallback(() => {
    setUrl('')
    setType('png')
    setImageURL('')
  }, [])

  const handleSaveClick = useCallback(() => {
    console.log('save clicked')
  }, [])

  const handleDownloadClick = useCallback(() => {
    saveAs(imageURL)
  }, [imageURL])


  return (
    <Container>
      <Paper style={{height: '650px', marginTop: '50px'}} >
        <div className="wrapper">
          <div className="input-wrapper">
            <div>
              <TextField style={{width: '50%', display: 'table-cell'}} onChange={handleURLChange} error={isError} helperText={message} value={url} required label='Enter the URL' size="medium" />
            </div>
            <CompactPicker color={color} onChange={(color) => setColor(color.hex)} />
            <div className="input-action-wrapper">
              <div>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  onChange={handleTypeChange}
                >
                  <MenuItem value='png'>PNG</MenuItem>
                  <MenuItem value='svg'>SVG</MenuItem>
                  <MenuItem value='jpg'>JPG</MenuItem>
                </Select>
              </div>
              <Button style={{height: '50px'}} variant="contained" color="primary" onClick={handleGenerateClick} >Generate</Button>
            </div>
          </div>
          <div className="result-wrapper">
            <QRDisplayer imageURL={imageURL}/>
            <Button color='primary' variant="outlined" onClick={handleDownloadClick} >Download</Button>
          </div>
          <div className="process-wrapper">
            <Button variant="contained" color="secondary" onClick={handleResetClick} >Reset</Button>
            <Button variant="contained" color="primary" onClick={handleSaveClick}>Save</Button>
          </div>
        </div>
      </Paper>
    </Container>
  )
}

export default QRs
