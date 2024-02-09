export interface UserToken{
    exp: number | null,
    iat: number | null,
    idutilisateur:number | null,
    role:string | null,
    sub: string | null,
}