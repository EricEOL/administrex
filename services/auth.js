export function isAuthenticated() {
    if (localStorage.getItem("@Sistem_mar21:token") !== null) {
        return true;
    } else {
        return false;

    }
}

