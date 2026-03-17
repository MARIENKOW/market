export type AuthType = "user" | "admin";

export type Actor =
    | { type: "user"; user: User; sessionId: string }
    | { type: "admin"; admin: Admin; sessionId: string };
