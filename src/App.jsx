import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FolderStructure from './componnents/FolderComponent/Structure.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FolderStructure/>
    </>
  )
}

export default App
