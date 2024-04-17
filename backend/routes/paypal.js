  
require('dotenv').config();
const express = require('express')
const PAYPAL_CLIENT_ID='ATcmJa7xf_kme_GlsNQxrsMnDPvZUHeQpHsiBvSuPUqBCB3FdS7psKRqb9QFeph6kPuypigwMsvzemvh';

const PAYPAL_CLIENT_SECRET='4032037044201404';
const PORT = '8888 ';

const base = "https://api-m.sandbox.paypal.com";

const router = express.Router()

  

// host static fi
/**

* Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.

* @see https://developer.paypal.com/api/rest/authentication/

*/

const generateAccessToken = async () => {

  try {

    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {

      throw new Error("MISSING_API_CREDENTIALS");

    }

    const auth = Buffer.from(

      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,

    ).toString("base64");

    const response = await fetch(`${base}/v1/oauth2/token`, {

      method: "POST",

      body: "grant_type=client_credentials",

      headers: {

        Authorization: `Basic ${auth}`,

      },

    });

    

    const data = await response.json();

    return data.access_token;

  } catch (error) {

    console.error("Failed to generate Access Token:", error);

  }

};

  

/**

* Create an order to start the transaction.

* @see https://developer.paypal.com/docs/api/orders/v2/#orders_create

*/

const createOrder = async (total) => {

  // use the total information passed from the front-end to calculate the purchase unit details

  console.log(

    "shopping total information passed from the frontend createOrder() callback:",

    total,

  );

  

  const accessToken = await generateAccessToken();

  const url = `${base}/v2/checkout/orders`;

  const payload = {

    intent: "CAPTURE",

    purchase_units: [

      {

        amount: {

          currency_code: "USD",

          value: total,

        },

      },

    ],

  };

  

  const response = await fetch(url, {

    headers: {

      "Content-Type": "application/json",

      Authorization: `Bearer ${accessToken}`,

      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:

      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/

      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'

      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'

      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'

    },

    method: "POST",

    body: JSON.stringify(payload),

  });

  

  return handleResponse(response);

};

  

/**

* Capture payment for the created order to complete the transaction.

* @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture

*/

const captureOrder = async (orderID) => {

  const accessToken = await generateAccessToken();

  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  

  const response = await fetch(url, {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

      Authorization: `Bearer ${accessToken}`,

      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:

      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/

      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'

      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'

      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'

    },

  });

  

  return handleResponse(response);

};

  

async function handleResponse(response) {

  try {

    const jsonResponse = await response.json();

    return {

      jsonResponse,

      httpStatusCode: response.status,

    };

  } catch (err) {

    const errorMessage = await response.text();

    throw new Error(errorMessage);

  }

}

  

router.post("/orders", async (req, res) => {

  try {

    // use the total information passed from the front-end to calculate the order amount detals

    const { total } = req.body;

    const { jsonResponse, httpStatusCode } = await createOrder(total);

    res.status(httpStatusCode).json(jsonResponse);

  } catch (error) {

    console.error("Failed to create order:", error);

    res.status(500).json({ error: "Failed to create order." });

  }

});

  

router.post("/orders/:orderID/capture", async (req, res) => {

  try {

    const { orderID } = req.params;

    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

    res.status(httpStatusCode).json(jsonResponse);

  } catch (error) {

    console.error("Failed to create order:", error);

    res.status(500).json({ error: "Failed to capture order." });

  }

});

  


  

module.exports = router;