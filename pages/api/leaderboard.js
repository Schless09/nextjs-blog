import axios from "axios";
import cheerio from "cheerio";

export default async (req, res) => {
  try {
    const response = await axios.get("https://www.espn.com/golf/leaderboard");
    const html = response.data;
    const $ = cheerio.load(html);
    let leaderboard = [];

    // This selector is just a placeholder. You will need to inspect the ESPN leaderboard
    // page and determine the correct selector for the leaderboard data.
    $(".leaderboard-row").each((index, element) => {
      leaderboard.push({
        name: $(element).find(".golfer-name").text(),
        score: $(element).find(".golfer-score").text(),
        // include other details you want here
      });
    });

    res.status(200).json({ leaderboard });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching leaderboard data." });
  }
};
