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

    try {
      const githubUserRes = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const githubUserData = githubUserRes.data;

      const githubReposRes = await axios.get(githubUserData.repos_url);
      const githubReposData: GithubRepoResponseProp[] = githubReposRes.data;
      const generate = async () => {
        try {
          const prompt = `Act as a roast comedian, and try roasting them on github repository data and roast them on all level as hard as you could go. Generate a roast that they could never code again or if the they try to than they should think twice before sharing in public. Also Add some funny coding repository names from githubrepo data, Mock them as they are wanna be FAANG Engineers. Here is my github repository description as well ${githubReposData.forEach(
            (item) => item?.description
          )} Here is my github repo data, ${githubReposData}. By the way my name is ${
            githubReposData[0]?.owner?.login
          } and you can use this repository names if you want to ${githubReposData?.forEach(
            (item) => item?.name
          )}`;
          const result = await geminiModel.generateContent(prompt);
          const response = result.response;
          return response.text();
        } catch (error) {
          console.log("response error", error);
        }
      };
      const response = await generate();
      console.log(response);
      res.status(200).json({ roast: response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
