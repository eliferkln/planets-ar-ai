import React, { useState } from "react";
import axios from "axios";
import styles from "./chat.module.css";

interface IProps {
  modelName: string;
}
const GPT3Example: React.FC<IProps> = ({ modelName }) => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const generateText = async () => {
    const prompt = input.trim();
    const apiKey = "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";

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: prompt,
          max_tokens: 4044,
          n: 1,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      console.log("responsee", response);
      let text = "";
      if (response.data.choices && response.data.choices.length > 0) {
        if (response.data.choices[0].text) {
          text = response.data.choices[0].text;
        } else if (response.data.choices[0].generated_text) {
          text = response.data.choices[0].generated_text;
        }
      }

      setOutput(text);
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  return (
    <div className={styles["chat-container"]}>
      <div className={styles["chat"]}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={modelName.toUpperCase()}
        />
        <button onClick={generateText}>Search</button>
      </div>
      <div className={styles["chat-desc"]}>{output}</div>
    </div>
  );
};

export default GPT3Example;
