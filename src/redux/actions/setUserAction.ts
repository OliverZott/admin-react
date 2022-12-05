import { User } from "../../models/User";

// event sending user to all components
export function setUserAction(user: User) {
    return {
        type: 'SET_USER',
        user
    }
}