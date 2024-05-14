import { BrowserRouter, Route, Routes } from 'react-router-dom';
import config from './firebase';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  console.log(config);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  );
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default WrappedApp;
