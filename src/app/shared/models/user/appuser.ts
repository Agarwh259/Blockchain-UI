import { Organization } from './organization';

export  interface User  extends Organization {
    username: String;
    password: String;
}
