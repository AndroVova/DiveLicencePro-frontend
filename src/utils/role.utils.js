
export const Role = {
    ADMIN: 'ADMIN',
    USER: 'USER'
}

export const toRole = (s) => {
    if(s === 'U'){
        return Role.USER
    }
    return Role.ADMIN
}