import "./App.css"
import { Route, Routes, BrowserRouter} from "react-router-dom"
import Header from "./Components/Header/Header"
import Homepage from "./pages/Homepage/Homepage"
import Category from "./pages/Category/Category"
import Auth from "./pages/Auth/Auth"


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/Category/:catergoryName' element={<Category />} />
      <Route path='/Auth' element={<Auth />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
