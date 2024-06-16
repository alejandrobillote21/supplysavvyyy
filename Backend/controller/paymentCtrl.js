const Paymongo = require("paymongo");
const instance = new Paymongo({
    key_id: "pk_test_ZUKykupbfcQR6Ny8uHmEq2Tm",
    key_secret: "sk_test_ZKvRjWe6j7G7qbaPPrLLXeDY"
});

const checkout = async (req, res) => {
    const {amount} = req.body
    const option = {
        amount: amount * 100, 
        currency: "PHP"
    }
     const order = await instance.orders.create(option);
        res.json({
            success: true,
            order
        })
    }


const paymentVerification = async (req, res) => {
    const { paymongoOrderId, paymongoPaymentId } = req.body;

    // You can implement verification logic here if needed
    res.json({
        success: true,
        paymongoOrderId,
        paymongoPaymentId
    });
};

module.exports = {
    checkout,
    paymentVerification
};