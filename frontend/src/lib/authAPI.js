import delay from "@/utils/delay";
import mockApiResponse from "@/utils/mockResponse";

export async function login(username, password) {

    // const res = await fetch("/api/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email: username, password }),
    //     credentials: "include",
    // });

    const authed = username === "abc" && password === "123";

    const res = await mockApiResponse(
        { username: username, password: password },
        authed ? 200 : 400,
        2000
    );

    if (!res.ok) {
        throw new Error("Login failed");
    }

    return res.json();
}

export async function logout() {

    // await fetch("https://api.example.com/logout", {
    //     method: "POST",
    //     credentials: "include", // Important to include cookies
    // });

    const res = await mockApiResponse(
        { message: "Logout successful" },
        200,
        2000
    );
    
    if (!res.ok) {
        throw new Error("Logout failed");
    }

    return res.json();
}

export async function register(username, password){
    // const res = await fetch("/api/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email: username, password }),
    //     credentials: "include",
    // });

    const res = await mockApiResponse(
        { username: username, password: password },
        200,
        2000
    );

    if (!res.ok) {
        throw new Error("Register failed");
    }

    return res.json();
}