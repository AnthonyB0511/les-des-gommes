const API_USERS = "/api/users";

// créer un utilisateur
export async function createUser(newUser) {
    const response = await fetch(`${API_USERS}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
    });
    const backResponse = await response.json();
    if (response.ok) {
        return backResponse;
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            throw new Error("Error API create user");
        }
    }
};
// connexion
export async function signin(values) {
    const response = await fetch(`${API_USERS}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
    });
    const backResponse = await response.json();
    if (response.ok) {
        return backResponse;
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            throw new Error("Error API login");
        }
    }
};
// déconnexion

export async function signout() {
    await fetch(`${API_USERS}/logout`, {
        method: "DELETE"
    });
}
// user with cookies
export async function getConnectedUser() {
    const response = await fetch(`${API_USERS}/userConnected`);
    return response.json();
}