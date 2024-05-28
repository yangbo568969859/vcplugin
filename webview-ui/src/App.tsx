import { useState } from 'react'
import MainPage from './components/Main'
import { Toaster } from "@/components/ui/toaster"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount((count) => count + 1)
    console.log('window.parent', window.parent)
    // window.parent.postMessage({
    window.parent.postMessage({
      type: 'increment',
      message: '子传父'
    }, '*')
  }

  return (
    <>
      <MainPage />
      <Toaster />
    </>
  )
}

export default App
