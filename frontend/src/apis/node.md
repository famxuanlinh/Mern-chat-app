apis
    | endpoints 
        | users 
            | get  
            | getMany 
            | create 
            | update 
            | delete 
        | chats 
            | get  
            | getMany 
            | create 
            | update 
            | delete 
        | groups
            | get  
            | getMany 
            | create 
            | update 
            | delete 

// users.ts

const get = (id: string) => {
    return api.get(`/users/${id}`)
}

export interface CreateUserPayload {
    name: string 
    email: string 
    avatar: string 
}

const create = (payload: CreateUserPayload) => {
    return api.post(`/users/${id}`)
}

export type UpdateUserPayload = CreateUserPayload
}


const update = (id: string, payload: UpdateUserPayload) => {
    return api.post(`/users/${id}`)
}



const getMany = (id: string) => {
    return api.getMany(`/users/${id}`)
}

interface User{
    id: string 
    name: string 
    email: string
}



create: post: /users  
update: patch: /users/:id pyaload 
get: get: /users

pages
    | Chat 
    | User 
        | hooks 
            | useCreateUser
            | useDeleteUser
            | useGetUser 
            | useGetUsers 
            | useUpdateUser


const useCreateUser = () => {
    const createUser = async (payload: UserPayload): User | null => {
        try{
            const data = await userEndpoints.create(payload)
            return data
        }catch(err){
            toast.error('Create user failed')
        }
    }
    
    return {
        createUser
    }

}            




// --------------------------------

const {createUser} = useCreateUser()

const handleSubmit = (values: any) => {
    createUser(values)
}



/chat 

:base_url/:params?:query 
http://localhost:8080/users/:id?name=linh

Message 
Message[]  
CreateMessagePayload 
UpdateMessagePayload 
UpdateMessageQuery 
UpdateMessageParams 
DeleteMessagePayload 
DeleteMessageQuery 
DeleteMessageParams 
GetMessageQuery 
GetMessageParams


/messages

/users
/chat-groups 