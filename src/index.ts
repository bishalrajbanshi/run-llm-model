import OpenAI from "openai";
import express from "express";
import { Request,Response } from "express"; 
import cors from "cors";
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors(
  {
    origin:"*"
  }
));
const openai = new OpenAI({
  apiKey:"",
  baseURL: "http://localhost:12434/engines/llama.cpp/v1",
});

app.post("/api/chat",  async (req:Request, res: Response) => {
  try {
    const {message} = req.body;
    const response = await openai.chat.completions.create({
      model: "ai/gemma3-qat",
      messages: [{ role: "user", content: message }],
    });
    res.status(200).json({message:response.choices[0].message});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Something went wrong"});
  }
})

app.listen(3000,() => {
  console.log("Server is running on port 3000");
})