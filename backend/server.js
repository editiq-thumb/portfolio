// @ts-nocheck
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const { exec } = require("child_process");
const execPromise = require("util").promisify(exec);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "..")));

let db = {
  thumbnails: [
    { id: 1, title: "Only Fans Business", imageUrl: "https://res.cloudinary.com/dvd6oa63p/image/upload/v1760991819/step_3_vbflw4.png", category: "business", ctr: "12.8%" },
    { id: 2, title: "Under Rs25K Phone", imageUrl: "https://res.cloudinary.com/dvd6oa63p/image/upload/v1760991750/tech_ph1_vjcgan.jpg", category: "tech", ctr: "15.2%" },
    { id: 3, title: "LinkedIn Growth Strategy", imageUrl: "https://res.cloudinary.com/dvd6oa63p/image/upload/v1760991750/thumbnail_2_pihncp.jpg", category: "business", ctr: "11.5%" },
    { id: 4, title: "iPhone VS Camera", imageUrl: "https://res.cloudinary.com/dvd6oa63p/image/upload/v1760991748/hrittik_thumb_kgqai8.jpg", category: "tech", ctr: "12.8%" },
    { id: 5, title: "Rs15K Gaming PC", imageUrl: "https://res.cloudinary.com/dvd6oa63p/image/upload/v1760991750/pc_build_ymmoee.jpg", category: "tech", ctr: "15.2%" },
    { id: 6, title: "Apple Fake in Japan", imageUrl: "https://res.cloudinary.com/dvd6oa63p/image/upload/v1760991750/tech_oliybg.jpg", category: "tech", ctr: "11.5%" }
  ],
  clients: [
    { id: 1, name: "Whatif with Abhishek", imageUrl: "images/client1.png", subscribers: "11M", channelUrl: "https://www.youtube.com/@Whatifwithabhishek" },
    { id: 2, name: "Techno Gamerz", imageUrl: "images/client2.png", subscribers: "49M", channelUrl: "https://www.youtube.com/@TechnoGamerzOfficial" },
    { id: 3, name: "Happy Prince Gaming", imageUrl: "images/client3.png", subscribers: "7M", channelUrl: "https://www.youtube.com/@HappyPrinceGaming" },
    { id: 4, name: "Sokher Gamer", imageUrl: "images/client4.png", subscribers: "2.2M", channelUrl: "https://www.youtube.com/@SokherGamer" }
  ],
  socialMedia: { instagram: "https://instagram.com/editiq", twitter: "https://twitter.com/editiq", youtube: "https://youtube.com/@editiq", linkedin: "https://linkedin.com/company/editiq" },
  settings: { maintenanceMode: false }
};

const auth = (req, res, next) => {
  const token = (req.headers["authorization"] || "").split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token." });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(403).json({ error: "Invalid token." }); }
};

const role = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ error: "Access denied." });
  next();
};

app.post("/api/auth/google-login", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required." });
  const allowed = (process.env.ALLOWED_ADMIN_EMAILS || "").split(",").map(e => e.trim().toLowerCase());
  if (!allowed.includes(email.trim().toLowerCase())) return res.status(403).json({ error: "Not authorized." });
  const token = jwt.sign({ email, role: "admin", id: "admin_google" }, process.env.JWT_SECRET, { expiresIn: "24h" });
  res.json({ success: true, token, user: { email, role: "admin" } });
});

app.get("/api/auth/verify", auth, (req, res) => res.json({ success: true, user: req.user }));
app.post("/api/auth/logout", auth, (req, res) => res.json({ success: true }));

app.get("/api/thumbnails", auth, (req, res) => res.json({ success: true, thumbnails: db.thumbnails }));

app.post("/api/thumbnails", auth, role(["admin"]), (req, res) => {
  const { title, imageUrl, category, ctr } = req.body;
  if (!title || !imageUrl) return res.status(400).json({ error: "Title and URL required." });
  const t = { id: Date.now(), title, imageUrl, category: category || "general", ctr: ctr || "N/A" };
  db.thumbnails.push(t);
  res.status(201).json({ success: true, thumbnail: t });
});

app.put("/api/thumbnails/:id", auth, role(["admin"]), (req, res) => {
  const id = Number(req.params.id);
  const idx = db.thumbnails.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found." });
  const { title, imageUrl, category, ctr } = req.body;
  db.thumbnails[idx] = { ...db.thumbnails[idx], title, imageUrl, category, ctr };
  res.json({ success: true, thumbnail: db.thumbnails[idx] });
});

app.delete("/api/thumbnails/:id", auth, role(["admin"]), (req, res) => {
  const id = Number(req.params.id);
  const idx = db.thumbnails.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found." });
  db.thumbnails.splice(idx, 1);
  res.json({ success: true });
});

app.get("/api/clients", auth, (req, res) => res.json({ success: true, clients: db.clients }));

app.post("/api/clients", auth, role(["admin"]), (req, res) => {
  const { name, imageUrl, subscribers, channelUrl } = req.body;
  if (!name || !imageUrl || !subscribers || !channelUrl) return res.status(400).json({ error: "All fields required." });
  const c = { id: Date.now(), name, imageUrl, subscribers, channelUrl };
  db.clients.push(c);
  res.status(201).json({ success: true, client: c });
});

app.delete("/api/clients/:id", auth, role(["admin"]), (req, res) => {
  const id = Number(req.params.id);
  const idx = db.clients.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found." });
  db.clients.splice(idx, 1);
  res.json({ success: true });
});

app.get("/api/social-media", auth, (req, res) => res.json({ success: true, socialMedia: db.socialMedia }));

app.put("/api/social-media", auth, role(["admin"]), (req, res) => {
  const { instagram, twitter, youtube, linkedin } = req.body;
  db.socialMedia = { instagram: instagram || db.socialMedia.instagram, twitter: twitter || db.socialMedia.twitter, youtube: youtube || db.socialMedia.youtube, linkedin: linkedin || db.socialMedia.linkedin };
  res.json({ success: true, socialMedia: db.socialMedia });
});

app.get("/api/settings", auth, (req, res) => res.json({ success: true, settings: db.settings }));
app.put("/api/settings", auth, role(["admin"]), (req, res) => {
  if (req.body.maintenanceMode !== undefined) db.settings.maintenanceMode = req.body.maintenanceMode;
  res.json({ success: true, settings: db.settings });
});

app.post("/api/git/push", auth, role(["admin"]), async (req, res) => {
  const cwd = path.join(__dirname, "..");
  try {
    await execPromise("git add .", { cwd });
    const { stdout } = await execPromise("git status --porcelain", { cwd });
    if (stdout.trim()) {
      await execPromise("git commit -m \"Update from admin panel\"", { cwd });
    }
    await execPromise("git pull origin main --rebase", { cwd });
    await execPromise("git push origin main", { cwd });
    res.json({ success: true, message: "Pushed to GitHub!" });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.get("/api/public/thumbnails", (req, res) => {
  if (db.settings.maintenanceMode) return res.status(503).json({ error: "Under maintenance." });
  res.json({ success: true, thumbnails: db.thumbnails });
});
app.get("/api/public/social-media", (req, res) => res.json({ success: true, socialMedia: db.socialMedia }));

app.get("/admin", (req, res) => res.redirect("/admin-auto"));
app.get("/admin-auto", (req, res) => res.sendFile(path.join(__dirname, "../public/admin-auto.html")));
app.get("/editor-dashboard", (req, res) => res.sendFile(path.join(__dirname, "../public/editor-dashboard.html")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

app.use((req, res) => res.status(404).json({ error: "Not found." }));
app.use((err, req, res, next) => { console.error(err.stack); res.status(500).json({ error: "Server error." }); });

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
  console.log("Admin: http://localhost:" + PORT + "/admin-auto");
});