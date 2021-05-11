import {
    CREATE_FORM
} from "./action-types";

export const createForm = (data) => ({
    type: CREATE_FORM,
    data,
});