import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const Invoice = () => {
  const [paymentStatus, setPaymentStatus] = useState('unpaid');

  const [invoiceDetails, setInvoiceDetails] = useState(null);

  const { id } = useParams();

  const handlePayment = async () => {
    fetch(`https://invoice-server.onrender.com/${id}/payment`)
      .then(response => response.json())
      .then(data => {
        setInvoiceDetails(data.result);
        console.log(invoiceDetails.longurl);

        setPaymentStatus(data.paymentStatus);
        return window.open(data.result.longurl);
      })

      .catch(error => console.error(error));
  };

  useEffect(() => {
    // Fetch invoice details from API
    fetch(`https://invoice-server.onrender.com/${id}`)
      .then(response => response.json())
      .then(data => {
        setInvoiceDetails(data);
        setPaymentStatus(data.paymentStatus);
      })
      .catch(error => console.error(error));
  }, [paymentStatus]);

  return !invoiceDetails ? (
    <div>Loading invoice details...</div>
  ) : (
    <div>
      <h1>Invoice Details</h1>
      <p>Invoice Number: {invoiceDetails.invoiceNumber}</p>
      <p>Customer Name: {invoiceDetails.customerName}</p>
      <p>Amount: {invoiceDetails.amount}</p>
      <p>Payment Status: {invoiceDetails.paymentStatus}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Invoice;
