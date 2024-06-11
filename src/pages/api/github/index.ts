import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req?.method === "POST") {
    const { username } = req.body;

    if (!username) {
      res.status(400).json({ message: "Username is required" });
      return;
    }

    try {
      const githubUserRes = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const githubUserData = githubUserRes.data;

      const githubReposRes = await axios.get(githubUserData.repos_url);
      const githubReposData = githubReposRes.data;
      // const openaiRes = await axios.post(
      //   "https://api.openai.com/v1/completions",
      //   {
      //     model: "text-davinci-003",
      //     prompt: `Analyze the GitHub repositories of the user with the following data: ${JSON.stringify(
      //       githubReposData
      //     )}. Generate a roast and questions based on the analysis.`,
      //     max_tokens: 150,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${OPENAI_API_KEY}`,
      //     },
      //   }
      // );

      // const roast = openaiRes.data.choices[0].text.trim();

      res.status(200).json({ github_repo_data: githubReposData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
