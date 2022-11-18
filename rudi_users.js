const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'rudi_users',
  password: 'root',
  port: 5432,
});

const getUsers = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM rudi_users', (error, results) => {
        // if (error) {
        //   reject(error)
        // }
        // resolve(results.rows);
      })
    }) 
  }
  const createUser = (body) => {
    return new Promise(function(resolve, reject) {
      const { username, password, role, code } = body
      pool.query('INSERT INTO rudi_users (username, password, role, code) VALUES ($1, $2, $3, $4) RETURNING *', [username, password, role, code], (error, results) => {
        if (error) {
          reject(error)
        }
        console.log('this is the conosole log', body)
        resolve(`A new user has been added added: ${results.rows[0]}`)
        
      })
    })
  }
  const deleteUser = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM rudi_users WHERE username = $1', [username], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`User deleted with username: ${username}`)
      })
    })
  }
  
  module.exports = {
    getUsers,
    createUser,
    deleteUser,
  }