# PayFlow_Digital_Wallet
API List
/api/auth/register
# user registration and wallet creation

/api/auth/login
# user login

POST /api/transactions
# create transactions(Depost(Credit) to self or Transfer to other users)
# Deposit: user to provide:{"transactionType": "Deposit","amount": 1500 }
# To Transfer, user provide: Reciever ID, amount and Transaction Type (Tranasfer)

// GET /api/view/transactions/user/<userId>
# to get user transactions by id (admin use)

# To view user's balance by the authenticated user
GET /api/wallet/me

Post collection
https://wonahgodwin.postman.co/workspace/Wonah-Godwin's-Workspace~67329ef3-d463-4e2e-822b-323edcbe870a/collection/45845870-c875bf18-e752-4cf8-bc9e-77052e70e660?action=share&creator=45845870


✅ 1. Deposit Transaction
Request URL:
POST https://payflow-digital-wallet.onrender.com/api/transactions

Headers:
Authorization: Bearer <your-valid-jwt-token>

Content-Type: application/json

Body: