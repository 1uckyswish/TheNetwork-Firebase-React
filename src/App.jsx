import "./App.css"
import { Route, Routes, BrowserRouter} from "react-router-dom"
import Header from "./Components/Header/Header"
import Homepage from "./pages/Homepage/Homepage"
import Category from "./pages/Category/Category"


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/Category/:catergoryName' element={<Category />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
