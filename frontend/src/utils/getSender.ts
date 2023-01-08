
import { User } from '@contexts/ChatContext/ChatContext'

const getSender = (loggedUser: User, users: User[]) => {
  return ''
    // return users[0]._id === loggedUser._id ? users[1] : users[0];
  };

export default getSender