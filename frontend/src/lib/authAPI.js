export async function login(username, password) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error("Login failed! " + ((json.error ? json.error : "")));
    }

    return json;
}

export async function logout() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });

    const json = await res.json();
    
    if (!res.ok) {
        throw new Error("Logout failed! " + (json.error ? json.error : ""));
    }

    return json;
}

export async function register(username, password){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error("Register failed! " + (json.error ? json.error : ""));
    }

    return json;
}