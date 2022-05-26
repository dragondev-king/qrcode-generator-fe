import { BrowserRouter, Routes, Route } from 'react-router-dom'

import QRs from './QRs'

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/qrs' element={<QRs />}/>
        <Route path='*' element={<QRs />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Main
