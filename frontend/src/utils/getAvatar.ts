import { LoginUser, User } from "@apis/endpoints/users";


const getAvatar = ( users: User[], loggedUser?: LoginUser) => {
  
    return users[0]._id === loggedUser?._id ? users[1]?.pic : users[0]?.pic;
  };

export default getAvatar