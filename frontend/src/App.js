import './App.css';
import Homepage from './containers/HomePage/Homepage';
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Productlistpage from './containers/Productlistpage/Productlistpage';

function App() {
  return (
    <div className="App">
     <BrowserRouter>

      <Routes>
        <Route path="/" exact element={<Homepage/>} />
        <Route path="/:slug" element={<Productlistpage/>} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
