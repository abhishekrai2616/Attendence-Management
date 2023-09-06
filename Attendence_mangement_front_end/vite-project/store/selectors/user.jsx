import { userState } from "../atom/user";
import { selector } from "recoil";



export const UserId=selector({
    key:'userEmail',
    get:({get}) =>{
        const state=get(userState);

        return state.userId;
    }
})

export const UserRole=selector({
    key:'Role',
    get:({get}) =>{
        const state=get(userState);

        return state.Role;
    }
})