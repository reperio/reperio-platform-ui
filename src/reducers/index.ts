import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import { authSessionReducer } from "./authSessionReducer"
import { usersReducer } from "./usersReducer";
import { userManagementReducer } from "./userManagementReducer";
import { permissionsReducer } from "./permissionReducer"
import { permissionManagementReducer } from "./permissionManagementReducer";

export const rootReducer = combineReducers({
    form: formReducer,
    authSession: authSessionReducer,
    users: usersReducer,
    userManagement: userManagementReducer,
    permissions: permissionsReducer,
    permissionManagement: permissionManagementReducer
});
