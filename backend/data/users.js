import bcrypt from 'bcryptjs';

const users = [
    {
        name:"Aditya Ubale",
        email:"adityaubale63@gmail.com",
        password : bcrypt.hashSync('123456', 10)
    },
    {
        name:"Vasudha Ubale",
        email:"adityaubale73@gmail.com",
        password : bcrypt.hashSync('123456', 10),
        isAdmin:true
    },
    {
        name:"Arpita Ubale",
        email:"arpitaubale63@gmail.com",
        password : bcrypt.hashSync('123456', 10)
    }
]

export default users;