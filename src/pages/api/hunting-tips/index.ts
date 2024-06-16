import { NextApiRequest, NextApiResponse } from "next";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req?.method === "POST") {
    const { roastData } = req.body;

    // Refactor once the hackathon finishes and Try using it with middlewares

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

    // Current Impl. is based on roast data we would ideally convert it with Resume And other profile data
    try {
      const generate = async () => {
        try {
          const prompt = `Act as a Technical lead of a FANG Organization and give user some piece of advice on the basis of the roast data that I am sharing with you, you can suggest them some better and nuanced exploration on the technology, languages and other parameters you like, here is my roastData ${roastData} `;
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
