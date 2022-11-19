# AuthenticationApis

```How to use this apis```


Markup1 : <details>
           <summary>How to use this apis </summary>
  <p>Clone the repo</p>
    <p>Inside the directory run npm install</p>
      <p>create .env file and pass following parameters: -</p>
  <p> JWT_SECRET=anyRandomValue</p>
    <p> DATABASE_URL=your database server url</p>
        <p>After pasting both args, move to next step</p>
         <p>On current terminal nun ```npx prisma db push --preview-feature```
         
 to pushes the state of your Prisma schema file to the database without using migrations.
</p>
         <p>After the successfull migration, run npm start</P>
         
         
         

</details>
    




  


</ditail>


## This App contains following routes:

     /users/signup
     Required fields : [name, email, password]
     Successfull response : {id, email, name}
     
     
      /users/signin
     Required fields : [email, password]
     Successfull response : {id, token}
     
       /users/my-profile
     Required field : [userId]
     Required headers : [ Bearer token]
     Successfull response : {id, email, name}
     
       /users/edit
     Required fields : [userId, name]
     Required headers : [ Bearer token]
     Successfull response : {id, email, name}
     
       /users/delete
     Required field : [userId]
     Required headers : [ Bearer token]
     Successfull response : successMessage

     

     
     
     
     
