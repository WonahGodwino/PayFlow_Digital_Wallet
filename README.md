# PayFlow_Digital_Wallet
API List
# user registration and wallet creation
/api/auth/register
# user login
/api/auth/login
# create transactions
POST /api/transactions

# to get user transactions by id (admin use)
// GET /api/view/transactions/user/<userId>
# To view user's balance by the authenticated user
GET /api/wallet/me