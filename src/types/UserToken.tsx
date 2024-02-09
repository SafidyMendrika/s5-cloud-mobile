export interface UserToken{
    exp: number | null,
    iat: number | null,
    idutilisateur:number ,
    role:string | null,
    sub: string | null,
}