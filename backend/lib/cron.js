import cron from "node-cron";
import https from "https";
// import http from "http";


const cronJob = cron.schedule("*/14 * * * *", () => {
  const backendUrl = process.env.BACKEND_URL;
  https
    .get(`${backendUrl}/health`, (res) => {
      console.log(`Ping successful: ${res.statusCode}`);
      res.resume();
    })
    .on("error", (err) => {
      console.error("Keep-alive failed:", err.message);
    });
});

export default cronJob;