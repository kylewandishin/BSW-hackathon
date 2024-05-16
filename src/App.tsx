import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './contexts/auth';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Topbar from './components/navbar';
import Signin from './pages/Signin';
// import Protected from './contexts/protected';
import MyResturant from './pages/MyResturant';
import Resturants from './pages/Resturants';

function App() {
  return (
    <>
      <Topbar />
      <div className="pt-[4rem] h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/resturants" element={<Resturants />} />
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
              <MyResturant />
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
