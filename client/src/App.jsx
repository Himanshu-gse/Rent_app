import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Properties from './pages/Properties';
import Seller from './pages/Seller';
const queryClient = new QueryClient();

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        { index: true, element: <Home /> },
        { path: '/signup', element: <SignUp /> },
        { path: '/login', element: <Login /> },
        { path: '/properties', element: <Properties /> },
        { path: '/sellerpage', element: <Seller /> },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
export default App;
