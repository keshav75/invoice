import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Invoice = () => {
  const [paymentStatus, setPaymentStatus] = useState('unpaid');

  const [invoiceDetails, setInvoiceDetails] = useState(null);

  const [accessToken, setAccessToken] = useState(null);

  const { id } = useParams();
  console.log(id);

  const getAccessToken = () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('grant_type', 'client_credentials');
    encodedParams.set('client_id', 'test_JLvYMS7DqeFWTMIB542h4Rn5x0tqOW4G979');
    encodedParams.set(
      'client_secret',
      'test_hkipeMBRjn7t9yoCzb6CpvA1KhjWWnNedBgbj1nZqpx139VhyddV2IyQ0XZSnWhneiho1EGVlFteOau3MOebEiOAKimEt0hsNpG0q0HyJftZsyaOkNH9GuvkBIj'
    );
    const options = {
      method: 'POST',
      url: 'https://test.instamojo.com/oauth2/token/',
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: encodedParams
    };

    axios
      .request(options)
      .then(response => response)
      .then(data => {
        console.log('@@@@@', data.data.access_token);
        setAccessToken(data.data.access_token);
      })

      .catch(function (error) {
        console.error(error);
      });
  };

  const createPaymentRequest = () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('allow_repeated_payments', 'false');
    encodedParams.set('send_email', 'false');
    encodedParams.set('amount', 1000);
    encodedParams.set('purpose', 'digital payment');

    const options = {
      method: 'POST',
      url: 'https://test.instamojo.com/v2/payment_requests/',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Authorization, X-Requested-With',
        'Sec-Fetch-Site': 'cross-site',
        ' Sec-Fetch-Mode': 'cors'
      },
      data: encodedParams
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handlePayment = async () => {
    getAccessToken();
    setPaymentStatus('paid');
  };

  useEffect(() => {
    createPaymentRequest();
  }, [accessToken]);

  useEffect(() => {
    // Fetch invoice details from API
    fetch(`https://invoice-server.onrender.com/${id}`)
      .then(response => response.json())
      .then(data => {
        setInvoiceDetails(data);
        setPaymentStatus(data.paymentStatus);
      })
      .catch(error => console.error(error));
  }, []);

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
