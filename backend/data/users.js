import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Yang',
        email: 'suifeng9960@hotmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users