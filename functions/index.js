const functions = require("firebase-functions");
const admin = require("firebase-admin");
const braintree = require("braintree");
const cors = require("cors")({ origin: true });

admin.initializeApp();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "6hnmzcr3h49tg45s",
  publicKey: "q4hc3t5sz3b2v3qm",
  privateKey: "cd5cf0ea05d9d20837db161715a05e6c",
});

// Braintree müşteri tokeni oluşturma
exports.generateClientToken = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response.clientToken);
      }
    });
  });
});

// Braintree ödeme işlemi
exports.createTransaction = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const nonceFromTheClient = req.body.paymentMethodNonce;
    const amountFromTheClient = req.body.amount;

    gateway.transaction.sale(
      {
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true,
        },
      },
      (err, result) => {
        if (err || !result.success) {
          res.status(500).send(err || result.message);
        } else {
          res.send(result);
        }
      }
    );
  });
});
