========================================
APP
========================================

1 clonar el repo:
  > git clone https://github.com/alternock/front_crud_server.git

2 ir al directorio del proyecto

3 dentro del directorio ejecutar: 
  > npm install

4 ejecutamos el back:
  > node server

5 ejecutamos el front:
  > npm run dev 


========================================
ENDPOINTS
========================================
  allUsers:
    url: "http://localhost:5000/all/users",
    method: "get"
  
  searchUserByEmail: 
    url: "http://localhost:5000/search/user/by/email",
    method: "get"
  
  createUser: 
    url: "http://localhost:5000/create/user",
    method: "post"
  
  removeUser:
    url: "http://localhost:5000/remove/user/by/email",
    method: "delete"  
  
   updateUser:
    url: "http://localhost:5000/update/user/by/email",
    method: "post"  
  