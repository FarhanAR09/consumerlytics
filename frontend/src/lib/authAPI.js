export async function login(username, password) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
    });

    // const authed = username === "abc" && password === "123";

    // const res = await mockApiResponse(
    //     { username: username, password: password },
    //     authed ? 200 : 400,
    //     2000
    // );

    if (!res.ok) {
        throw new Error("Login failed");
    }

    return res.json();
}

export async function logout() {

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });

    // const res = await mockApiResponse(
    //     { message: "Logout successful" },
    //     200,
    //     2000
    // );
    
    if (!res.ok) {
        throw new Error("Logout failed");
    }

    return res.json();
}

export async function register(username, password){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
    });

    // const res = await mockApiResponse(
    //     { username: username, password: password },
    //     200,
    //     2000
    // );

    if (!res.ok) {
        throw new Error("Register failed");
    }

    return res.json();
}