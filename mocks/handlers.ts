// mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  // ---------------------------
  // LOGIN
  // ---------------------------
  http.post("http://127.0.0.1:8000/admin/login", async ({ request }) => {
    const body = await request.text();
    const params = new URLSearchParams(body);

    const username = params.get("username");
    const password = params.get("password");

    if (username === "admin" && password === "admin") {
      return HttpResponse.json(
        { message: "Login success" },
        {
          status: 200,
          headers: {
            // mock cookie
            // "Set-Cookie": "sessionid=mock-session-token; Path=/;",
            "Set-Cookie": "sessionid=mock-super; Path=/;",
          },
        }
      );
    }

    return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }),

  // ---------------------------
  // LOGOUT
  // ---------------------------
  http.post("http://127.0.0.1:8000/admin/logout", () => {
    return HttpResponse.json(
      { ok: true },
      {
        status: 200,
        headers: {
          // expire cookie
          "Set-Cookie": "sessionid=; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
        },
      }
    );
  }),

  // ---------------------------
  // GET NEWS LIST
  // ---------------------------
  http.get("http://127.0.0.1:8000/admin/news", () => {
    return HttpResponse.json([
      { id: 1, content: "Mocked News 1", created_at: "2025-01-01T10:20:00", status: true },
      { id: 2, content: "Mocked News 2", created_at: "2025-01-02T11:35:00", status: false },
    ]);
  }),

  // ---------------------------
  // ADD NEWS
  // ---------------------------
  http.post("http://127.0.0.1:8000/admin/news/add", async ({ request }) => {
    const body = await request.text();
    const params = new URLSearchParams(body);

    const content = params.get("content") || "";

    return HttpResponse.json({
      id: Math.floor(Math.random() * 10000),
      content,
      created_at: new Date().toISOString(),
    });
  }),

  // ---------------------------
  // DELETE NEWS
  // ---------------------------
  http.post("http://127.0.0.1:8000/admin/news/delete/:id", () => {
    return HttpResponse.json({ ok: true }, { status: 200 });
  }),

  // ...existing handlers

  // USERS LIST
  http.get("http://127.0.0.1:8000/admin/users", () => {
    return HttpResponse.json([
      { id: 1, pf_id: 1234567, name: "Nithin", department: "Innovation Hub", location: "Belapur", mobile: 9876543210, status: true },
      { id: 2, pf_id: 1088599, name: "Anurag", department: "IT Innovation", location: "Belapur", mobile: 9123456789, status: false },
    ]);
  }),

  // ADD USER
  http.post("http://127.0.0.1:8000/admin/users/add", async ({ request }) => {
    const txt = await request.text();
    const params = new URLSearchParams(txt);
    const pf_id = params.get("pf_id") || "";
    const name = params.get("name") || "";
    return HttpResponse.json({
      id: Math.floor(Math.random() * 10000),
      pf_id,
      name,
      department: params.get("department") || "",
      location: params.get("location") || "",
      mobile: params.get("mobile") || "",
      registered: "Yes",
    });
  }),

  // UPLOAD CSV
  http.post("http://127.0.0.1:8000/admin/users/upload_csv", async ({ request }) => {
    // We cannot read multi-part form easily, just return success and maybe echo filename
    return HttpResponse.json({ ok: true, message: "CSV processed (mock)", imported: 3 });
  }),
];



// inside mocks/handlers.ts (merge into handlers array)

