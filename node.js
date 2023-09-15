const express = require('express');
const axios = require('axios'); // You might need to install this library: npm install axios
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Your MoMoPay API endpoint (replace with the actual URL)
const momoPayApiUrl = 'https://api.momopay.com/collect';

// Your MoMoPay API Key (replace with your actual API key)
const apiKey = 'YourApiKey';

// Endpoint to initiate a payment collection
app.post('/initiatePayment', async (req, res) => {
    try {
        const paymentData = {
            amount: req.body.amount,
            payerPhoneNumber: req.body.payerPhoneNumber,
            paymentReference: req.body.paymentReference,
            callbackUrl: req.body.callbackUrl,
        };

        // Send a POST request to the MoMoPay API
        const response = await axios.post(momoPayApiUrl, paymentData, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        // Handle the MoMoPay API response
        const responseData = response.data;

        // Here, you can process the responseData, log it, and send an appropriate response to the frontend.
        res.json({ success: true, message: 'Payment initiated successfully', data: responseData });
    } catch (error) {
        // Handle errors here and send an error response to the frontend.
        res.status(500).json({ success: false, message: 'Payment initiation failed', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

