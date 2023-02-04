src
    | apis (apis.tsx)
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
    | components (components dùng chung cho toàn page)
        | UserCard (.ts) 
        | UserInfoModal (.ts)
    | constants
        | env.ts
    | contexts
        | ChatContexts.tsx
        | useChatContexts.tsx
    | pages
        | Auth (.ts)
            | components
                | LoginForm (.ts)
                | RegisterForm (.ts)
        | Chat (.ts)
            | components
                | ChatContent (.ts) (message)
                | ChatGroup (.ts)
                    | ChatGroupModal.ts
                    | Empty.ts
                    | SelectedUser.ts
                | ChatUserList (.ts) (sidebar)
        | NotFound (.ts)
    | utils
        | getAvatar.ts
        | getSenfer.ts



 // window.scrollTo({
    //   left: 0,
    //   top: document.body.scrollHeight,
    //   behavior: "smooth",
    // });
    // console.log(user?._id)