
# project - Product Management

/login: 
/admin: layout

/admin/*
feature: /admin/dashboard
feature: /admin/products


authentication
- login
- sign up/ register
- forget password

Click login
- Call api to login
- Success -> redirect Admin
- Failed -> Show Error

LOGIN
LOGOUT

authSaga

LOOP
- if logged in, watch LOGOUT
- else watch LOGIN

LOGIN
- Call login API to get token + user info
- Set token to local Storage
- Redirect to admin page

LOGOUT
- Clear token from local storage
- Redirect to Login page


authSlice: define actions and reducers
authSaga: define effects


## Product

ROUNTINGS 
- /admin/products: listing
- /admin/products/add: add new product
- /admin/products/:productId: update product

LISTING
- Search by name
- Filter by color
- Sort by name, price
- Pagination

Product slice state:
- Loading
- List
- Filter
- Pagination

ADD/ EDIT
 - React hook form v7
 - Yup: validation

ROUTINGS
- /admin/products/add: add new product
- /admin/products/:productId: update product

Product Form
- Mode: add/edit
Initial values:
-Values:
    -name: text input
    - color: Text input
    - Price: number input
    - categoryId: select

- Validations: all required
    - name: at least 1 word
    - color: at least 1 word
    - price: > 1$
    - category: required

- Submission: redirect to product list page after submitting succesfully