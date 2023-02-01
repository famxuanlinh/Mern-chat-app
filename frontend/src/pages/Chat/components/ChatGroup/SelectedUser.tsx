import { User } from '@apis/endpoints/users'
import React from 'react'

interface Props{
    users: User[]
}

const SelectedUser: React.FC<Props> = ({users}) => {
    console.log(users)
  return (
    <div>SelectedUsers</div>
  )
}

export default SelectedUser