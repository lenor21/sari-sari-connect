import { Outlet } from 'react-router';
import NavBar from './components/custom/nav-bar';
import { ThemeProvider } from '@/components/custom/theme-provider';

const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <NavBar />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
