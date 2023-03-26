import './App.css';
import AllInvoices from './pages/all-invoices/all-invoices';
import Invoice from './pages/invoice/invoice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <header className='App-header'>
          <Routes>
            <Route path='/' element={<AllInvoices />} />
            <Route path='/invoice/:id' element={<Invoice />} />
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
