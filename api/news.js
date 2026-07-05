import { fetchNewsHeadlines } from "../server/newsProxy.js";

export default async function handler(req, res) {
  try {
    const data = await fetchNewsHeadlines(new URLSearchParams(req.query));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
