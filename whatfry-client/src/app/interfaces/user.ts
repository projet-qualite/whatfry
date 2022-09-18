export interface User {
    identifier?: number,
    firstname?: string,
    lastname?: string,
    profil?: string
}


export interface UserState{
    userData: User | null;
    token: string | null;
    error: string | null;
    users: User[] | null;
}

export interface Identifiant{
    firstname?: string,
    lastname?: string,
    email: string,
    password: string
}