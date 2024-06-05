import MainPage from './components/Main'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"
import './App.css'

function App() {
  return (
    <>
      <MainPage />
      <Toaster />
      <SonnerToaster />
    </>
  )
}

export default App
