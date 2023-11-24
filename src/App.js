import { Header } from './components/header/Header';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Input } from './components/input/Input';
import { About } from './components/about/About';
import { Footer } from './components/footer/Footer';
import Images from './components/images/Images';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path='/' element={<Input/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/images' element={<Images/>}></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
