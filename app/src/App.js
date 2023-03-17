import logo from './logo.svg';
import './App.css';
import AllInvoices from './pages/all-invoices/all-invoices';
import Invoice from './pages/invoice/invoice';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Switch,
  Routes,
  Link
} from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <header className='App-header'>
          {/* <AllInvoices /> */}

          <Routes>
            <Route path='/' element={<AllInvoices />} />
            <Route
              path='/invoice/:id'
              element={
                <>
                  <Invoice />
                </>
              }
            />
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
