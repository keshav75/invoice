import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllInvoices = () => {
  const [allInvoices, setAllInvoices] = useState([]);

  const getAllInvoices = async () => {
    await fetch('https://invoice-server.onrender.com/all-invoice').then(
      response => {
        response.json().then(data => {
          console.log(data);
          setAllInvoices(data);
        });
      }
    );
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
  );
};

export default AllInvoices;
