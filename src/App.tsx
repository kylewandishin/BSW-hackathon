import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './contexts/auth';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Topbar from './components/navbar';
import Signin from './pages/Signin';
// import Protected from './contexts/protected';
import MyRestaurant from './pages/MyRestaurant';
import Restaurants from './pages/Restaurants';

function App() {
  return (
    <>
      <Topbar />
      <div className="pt-[4rem] h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route
            path="/dashboard"
            element={<Dashboard />}
            // element={
            //   <Protected>
            //     <Dashboard />
            //   </Protected>
            // }
          />
          <Route
            path="/myrestaurant"
            element={
              // <Protected>
              <MyRestaurant />
              // </Protected>
            }
          />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </>
  );
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default WrappedApp;
