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
      model: "gemini-2.0-flash",
      generationConfig,
      safetySettings,
    });

    try {
      const githubUserRes = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const githubUserData = githubUserRes.data;

      console.log({ githubUserData });

      const githubReposRes = await axios.get(githubUserData.repos_url);
      const githubReposData: GithubRepoResponseProp[] = githubReposRes.data;

      console.log(githubReposData);

      const generate = async () => {
        try {
          const descriptions = githubReposData
            .map((item) => item?.description)
            .join(", ");
          const repoNames = githubReposData
            .map((item) => item?.name)
            .join(", ");
          const username = githubReposData[0]?.owner?.login || "Anonymous";

          const prompt = `
          Act as a savage roast comedian with a talent for cutting sarcasm. Your target? A so-called developer who thinks they are a code wizard but has a GitHub profile full of questionable experiments. 
          
          Here are their GitHub repository descriptions: ${
            descriptions || "Absolutely nothing worth mentioning."
          }.
          
          Here are their GitHub repository names: ${
            repoNames || "A collection of failed dreams and spaghetti code."
          }.
          
          Their GitHub username is: ${username}, but let's be honest, they might want to change it after this.
          
          Roast them without mercy. Tear apart their naming choices, mock their desperate attempts at coding, and question their so-called 'technical prowess'. Mention how their repo names sound like someone spilled a Scrabble bag while trying to code, and their descriptions are like self-destruct buttons for anyone who dares to read them.
          
          Don't just roast them—obliterate their confidence. Make them feel like they should attach a 'Work in Progress' sign to their entire career. And don't forget to add some clever, fake but hilariously bad GitHub repo names they could create next, like 'SpaghettiScript', '404-Brain-Not-Found', or 'Uninstall-Career'.
        `;

          const result = await geminiModel.generateContent(prompt);
          const response = result.response;

          return response.text();
        } catch (error) {
          console.error("response error", error);
          throw new Error("Failed to generate roast. Please try again later.");
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
