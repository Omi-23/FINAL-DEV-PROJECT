export async function getMe(req, res) {
  res.json({ ok: true, data: req.auth.userDoc });
}
