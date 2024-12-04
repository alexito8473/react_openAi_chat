import OpenAI from "openai";

const openai=new OpenAI({
apiKey:import.meta.env.VITE_CHATGPT_AI_API_KEY,
dangerouslyAllowBrowser:true,
});
export class Assistant{
    #model
    constructor(model="gpt-4o-mini"){
        this.#model=model
    }
    async chat(newContent, history) {
        try {
          const result = await openai.chat.completions.create({
            model: this.#model,
            messages: [...history, { content : newContent, role: "user" }],
          });
    
          return result.choices[0].message.content;
        } catch (error) {
        console.log("hOLA TIO")
          throw error;
        }
      }
}