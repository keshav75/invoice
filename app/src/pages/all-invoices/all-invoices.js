import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllInvoices = () => {
  const [allInvoices, setAllInvoices] = useState([]);

  const getAllInvoices = async () => {
    await fetch('http://localhost:3010/all-invoice').then(response => {
      response.json().then(data => {
        console.log(data);
        setAllInvoices(data);
      });
    });
  };

  useEffect(() => {
    getAllInvoices();
    console.log(allInvoices);
  }, []);

  const listItems = allInvoices?.map(invoice => (
    <li>{invoice.customerName} </li>
  ));

  return (
    <div>
      <h2>Invoice List</h2>
      <table>
        <thead>
          <tr style={{ padding: 2 }}>
            <th style={{ padding: '12px', border: '1px solid #ccc' }}>
              Invoice Number
            </th>
            <th style={{ padding: '12px', border: '1px solid #ccc' }}>
              Customer Name
            </th>
            <th style={{ padding: '12px', border: '1px solid #ccc' }}>
              Amount
            </th>
            <th style={{ padding: '12px', border: '1px solid #ccc' }}>
              Payment Status
            </th>
            <th style={{ padding: '12px', border: '1px solid #ccc' }}>
              Pay Now
            </th>
          </tr>
        </thead>
        <tbody>
          {allInvoices.map(invoice => (
            <tr key={invoice._id.$oid}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.customerName}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.paymentStatus}</td>
              <td>
                <Link to={`/invoice/${invoice._id}`}>
                  <button>Open</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    // <div>
    //   <div style={{ padding: 20 }}>{listItems}</div>
    //   <div>
    //     {/* <Routes>
    //       <Route path='/invoice/1' Component={<Invoice />}></Route>
    //     </Routes> */}
    //     <Link to='/about'>Click to view our about page</Link>
    //     <button> Invoice</button>
    //   </div>
    // </div>
  );
};

export default AllInvoices;
