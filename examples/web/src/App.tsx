import React, { useEffect, useState } from 'react'
import { XhrComponent } from './Xhr'
import { UploadComponent } from './Upload'
import { FetchComponent } from './Fetch'

function App() {

  return (
    <div className="App">
      <FetchComponent />
    </div>
  )
}

export default App
