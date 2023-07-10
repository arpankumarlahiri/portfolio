import { atom } from "recoil";

export interface AuthModalState {
    open: boolean;
    view: "login" | "signup" | "resetPassword";
}

const defaultModalState: AuthModalState = {
    open: false,
    view: "login",
}

const authModalState = atom<AuthModalState>({
    key: 'authModalState',
    default: defaultModalState,
})

export default authModalState;