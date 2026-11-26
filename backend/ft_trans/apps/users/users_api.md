GET /api/auth/csrf "this give u CSRF cookie to prove that this request from our site not others" 
and u have to send it back in request header like this 
```
X-CSRFToken: lnVMGGxEphCxhs6WN015rT3fHr8eutx6
```

POST /api/auth/register "this is where u send register info to create account and u have to send the request body in json form like this"
```
{
  "first_name": "first_name",
  "last_name": "last_name",
  "email": "email@gmail.com",
  "password": "password"
}
```

POST /api/auth/login "this is where u send login info to create sessionid and u have to send the request body in json form like this"
```
{
  "email": "email",
  "password": "password"
}
```

POST /api/auth/logout "and this is for logout it does't need a body it just delete the sessionid from the database"

POST /api/auth/employees/ "and this for admin or boss to create his employees account and they well have less permission that the boss. and it required same body content as register api"

GET /api/auth/employees/ "and this for admin to retrieve his employees info and the response well be like this in json form"
```
{
  "workers": [
    {
      "id": 3,
      "first_name": "emp1",
      "boss": "safouan"
    },
    {
      "id": 4,
      "first_name": "emp2",
      "boss": "safouan"
    },
    {
      "id": 5,
      "first_name": "emp3",
      "boss": "safouan"
    },
    {
      "id": 6,
      "first_name": "emp4",
      "boss": "safouan"
    }
  ]
}
```