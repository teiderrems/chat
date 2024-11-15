"use client"

import { Mistral } from "@mistralai/mistralai";
import { useState } from "react";

export interface Content{
  message?:string;
  response?:string;
}

export default function Page() {


const [message,setMessage]=useState("Who is the best French painter? Answer in one short sentence.");
const [response,setResponse]=useState();

const [content,setContent]=useState<Content[]>([]);
  

const mistral = new Mistral({
  apiKey: process.env["MISTRAL_API_KEY"] ?? "XEgjN3K0OxKtkjBqzEq7uCCFqbj9pRaw",
});

async function run() {
  const result = await mistral.chat.complete({
    model: "mistral-small-latest",
    messages: [
      {
        content:message,
        role: "user",
      },
    ],
  });

  // Handle the result
  setContent((state)=>[...state!,{response:(result.choices as any)[0].message.content,message}]);
}

  return (
    <div style={{height:"100vh",width:"100%",display:"flex",flexDirection:'column',padding:0,margin:0}}>
        <div style={{height:'75%',width:"100%",backgroundColor:"gray"}}>
          {
            content?.map(c=>(
              <ul style={{listStyle:"none"}}>
                <li style={{borderBottom:"2px"}}>{c.message}</li>
                <li>{c.response}</li>
              </ul>
            ))
          }
        </div>
        <div style={{display:"flex",width:"100%"}}>
            <textarea placeholder="input what you want to search" onChange={(e)=>setMessage(e.target.value)}></textarea>
            <button onClick={()=>run()}>submit</button>
        </div>
    </div>
  );
}
