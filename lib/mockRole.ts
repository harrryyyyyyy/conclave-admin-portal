export function getMockRole(): "super" | "user" | null {
    if (typeof document === "undefined") return null;

    const m = document.cookie.match(/sessionid=([^;]+)/);
    if (!m) return null;

    const value = m[1];

    if (value.includes("mock-super")) return "super";
    if (value.includes("mock-session-token")) return "user";

    return null;
}
