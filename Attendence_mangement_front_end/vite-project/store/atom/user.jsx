import { atom } from "recoil";

export const userState = atom({
    key:'userState',
    default:{
        Role:"Teacher",
        userId:null
    }
})