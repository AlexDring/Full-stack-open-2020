import React from 'react'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  // const [users, setUsers] = useState()
  // const blogs = useSelector(state => state.blogs)
  // let users = []

  // blogs.forEach(blog => {
  //   users = [...users, blog.user]
  // })

  // let countedUsers = users.reduce(function (accumulator, currentValue) {
  //   if (currentValue.name in accumulator) {
  //     accumulator[currentValue.name]++
  //   }
  //   else {
  //     accumulator[currentValue.name] = 1
  //   }
  //   return accumulator
  // }, {})
  // console.log(countedUsers)

  // let result = Object.keys(countedUsers).map(e => ({
  //   name: e, count: countedUsers[e]
  // }))
  // console.log(result)

  if (!users) {
    return null
  }
  return(
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <th><Link to={`/users/${user.id}`}>{user.name}</Link></th>
              <th>{user.blogs.length}</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users