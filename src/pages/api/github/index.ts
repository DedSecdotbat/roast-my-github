import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { GithubRepoResponseProp } from "@/modules/github/types";

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

    const gemini_api_key = process.env.GEMINI_API_KEY;
    if (!gemini_api_key) {
      res.status(500).json({ message: "API KEY REQUIRED" });
      return;
    }

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 1000,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];

    const googleAI = new GoogleGenerativeAI(gemini_api_key || "");

    const geminiModel = googleAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig,
      safetySettings,
    });

    const model = googleAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
      const githubUserRes = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const githubUserData = githubUserRes.data;

      const githubReposRes = await axios.get(githubUserData.repos_url);
      const githubReposData = githubReposRes.data;
      const generate = async () => {
        try {
          const prompt = `Act as a roast comedian, and try roasting my github repo data and roast me on all level as hard as you could go. Try making two three jokes on github repository names and project ideas, also include commit messages and code review if any. here is my github repository data ${githubReposData} `;
          const result = await geminiModel.generateContent(prompt);
          const response = result.response;
          return response.text();
        } catch (error) {
          console.log("response error", error);
        }
      };
      const response = await generate();
      res.status(200).json({ roast: response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
