"use client"

import { ArrowUpOutlined, UserOutlined } from "@ant-design/icons";
import { Mistral } from "@mistralai/mistralai";
import { Avatar, Button, Empty, Form, Input, Space } from "antd";
import { formatDate } from "./date";
import { FormEvent, useState } from "react";
import { Popover } from 'antd';
import Content from "./components/Content";

export interface Content{
  message?:string;
  response?:string;
  id:number;
}

export interface Chat{
  id:number;
  content:Content[];
  name:string;
}

export default function Page() {


const [message,setMessage]=useState("Who is the best French painter? Answer in one short sentence.");
const [response,setResponse]=useState();

const [chat,setChat]=useState<Chat[]>([]);

const [content,setContent]=useState<Content[]>([]);
const [isSubmit,setIsSubmit]=useState(false);
  

const mistral = new Mistral({
  apiKey: process.env["MISTRAL_API_KEY"] ?? "XEgjN3K0OxKtkjBqzEq7uCCFqbj9pRaw",
});

async function run(e:FormEvent) {
  e.preventDefault();
  setIsSubmit(true);
  try {
    const result = await mistral.chat.complete({
      model: "mistral-small-latest",
      messages: [
        {
          content:message,
          role: "user",
        },
      ],
    });
    setContent((state)=>[...state!,{response:(result.choices as any)[0].message.content,message,id:Date.now()}]);
    setChat(state=>[...state,{content:[...content,{response:(result.choices as any)[0].message.content,message,id:Date.now()}],id:Date.now(),name:message}]);
    setMessage("");
    setIsSubmit(false);
  } catch (error) {
    console.log(error);
    setIsSubmit(false);
  }

}

function saveData():void{

  if (localStorage) {
    localStorage.setItem("chat",JSON.stringify(chat));
  }
}

// useEffect(()=>{
//   return
// },[])

  function load(c: Chat): void {
    console.log(c);
  }

  return (
    <div className="grid grid-rows-12 grid-cols-12 h-screen overflow-hidden">
      <div className="row-span-12 row-start-1 col-span-2 col-start-1 border-r border-r-gray-300">
        <h1 className="m-2 text-3xl hover:cursor-pointer hover:rounded-md hover:border hover:shadow-inner">Chat-Bot</h1>
        {
          chat.length>0?chat.map(c=>(
            <Popover key={c.id} content={<div className="flex flex-col">
              <h5>{c.name}</h5>
              <h6 className="self-end text-gray-600">{formatDate(c.id)}</h6>
            </div>} placement="bottomRight">
                  <h5 onClick={()=>load(c)} className="m-2 p-1 truncate hover:cursor-pointer hover:rounded-md hover:border hover:shadow-inner" key={c.id}>
                  {c.name}</h5>
            </Popover>)): <Empty />
        }
      </div>
      <div className="row-span-1 px-3 row-start-1 col-span-10 flex justify-between items-center col-start-3">
      <h1 className="p-1 text-3xl hover:cursor-pointer hover:rounded-md hover:border hover:shadow-inner">Chat-Bot</h1>
      <Avatar icon={<UserOutlined/>} className="hover:cursor-pointer"/>
      </div>
        <div className="row-span-10 px-10 sm:px-24 md:px-48 row-start-2   col-span-10 col-start-3 overflow-y-auto">
          <h4 className="font-bold text-gray-500">How can i help you today?</h4>
          {
            content?.map(c=>(
              <div key={c.id} className="flex flex-col">
                <Content message={c.message!} content={c.response!}/>
              </div>
            ))
          }
        </div>
        <Form onSubmitCapture={(e)=>run(e)} size="large" className="row-span-1 px-10 sm:px-14 md:px-16 row-start-12 col-span-10 col-start-3 flex items-center">
            <Space.Compact size="large" className="w-full">
              <Input onChange={(e)=>setMessage(e.target.value)} value={message} className="rounded-full"/>
              <Button type="primary" htmlType="submit" loading={isSubmit} className="rounded-r-full" icon={<ArrowUpOutlined />}/>
            </Space.Compact>          
        </Form>
    </div>
  );
}
