import { useEffect, useState } from "react";
import { OpenAI } from "openai";
import debounce from 'lodash.debounce';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  dangerouslyAllowBrowser: true
});

const useTranslate = (sourceText, selectedLanguage) => {
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    const handleTranslate = debounce(async (sourceText) => {
      try {
        const response = await openai.chat.completions.create({
          messages: [            
            {
              role: "user",
              content: `You will be provided with a sentence. This sentence: 
                            ${sourceText}. Your tasks are to:
                            - Detect what language the sentence is in
                            - Translate the sentence into ${selectedLanguage}
                            Do not return anything other than the translated sentence.`
            }
          ],
          model: "gpt-3.5-turbo",
        });
        const data = response.choices[0].message.content;
        setTargetText(data);
      } catch (error) {
        console.error("Error translating text:", error);
      }
    }, 1000);

    if (sourceText.trim() !== "") {
      const timeoutID = setTimeout(() => {
        handleTranslate(sourceText);
      }, 500);
      return () => clearTimeout(timeoutID);
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;
