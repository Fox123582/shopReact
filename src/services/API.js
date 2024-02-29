import axios from "axios";

export default {
    getUsers:()=> axios.get('https://634e9f834af5fdff3a625f84.mockapi.io/users'),

    changeStatus:(person)=> axios.put(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${person.id}`,{
        status:!person.status
    }),

    setNewUser: (person)=> axios.post('https://634e9f834af5fdff3a625f84.mockapi.io/users',person),

    getGoods: ()=> axios.get('https://634e9f834af5fdff3a625f84.mockapi.io/products'),

    changeAllData: (person)=> axios.put(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${person.id}`,person),

    deleteAccount: (person)=> axios.delete(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${person.id}`)
}