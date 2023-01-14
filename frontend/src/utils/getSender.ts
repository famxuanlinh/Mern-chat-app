import { LoginUser, User } from "@apis/endpoints/users";


const getSender = ( users: User[], loggedUser?: LoginUser) => {
  
    return users[0]._id === loggedUser?._id ? users[1]?.name : users[0]?.name;
  };

export default getSender