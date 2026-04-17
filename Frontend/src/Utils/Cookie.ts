
// --------- Extract Cookie (CSRF) ---------

export const ExtractCookie = () => {
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrf_token='))
        ?.split('=')[1] ; 

    return csrfToken ; 
}