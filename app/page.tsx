"use client"

import { ArrowUpOutlined, UserOutlined } from "@ant-design/icons";
import { Mistral } from "@mistralai/mistralai";
import { Avatar, Button, Empty, Form, Input, Space } from "antd";
import moment from "moment";
import { FormEvent, useState } from "react";

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

  function load(c: Chat): void {
    console.log(c);
  }

  return (
    <div className="grid grid-rows-12 grid-cols-12 h-screen overflow-hidden">
      <div className="row-span-12 row-start-1 col-span-2 col-start-1 border-r border-r-gray-300">
        <h1 className="m-2 text-3xl hover:cursor-pointer hover:rounded-md hover:border hover:shadow-inner">Chat-Bot</h1>
          <ul>
              {
                chat.length>0?chat.map(c=>(
                <li onClick={()=>load(c)} className="m-2 truncate hover:cursor-pointer hover:rounded-md hover:border hover:shadow-inner" key={c.id}>
                  {moment(c.id).fromNow()}</li>)): <Empty />
              }
          </ul>
      </div>
      <div className="row-span-1 row-start-1 col-span-10 flex justify-between items-center px-2 col-start-3">
      <h1 className="p-1 text-3xl hover:cursor-pointer hover:rounded-md hover:border hover:shadow-inner">Chat-Bot</h1>
      <Avatar icon={<UserOutlined/>} className="hover:cursor-pointer"/>
      </div>
        <div className="row-span-10 p-2 row-start-2  col-span-10 col-start-3 overflow-y-auto">
          <h4 className="font-bold text-gray-500">How can i help you today?</h4>
          {
            content?.map(c=>(
              <ul key={c.id} className="flex flex-col" style={{listStyle:"none"}}>
                <li className="self-end p-2 rounded-3xl bg-gray-200" >{c.message}</li>
                <li ><p className="text-justify">{c.response}</p></li>
              </ul>
            ))
          }
        </div>
        <Form onSubmitCapture={(e)=>run(e)} size="large" className="row-span-1 px-4 row-start-12 col-span-10 col-start-3 flex items-center">
            <Space.Compact size="large" className="w-full">
              <Input onChange={(e)=>setMessage(e.target.value)} value={message} className="rounded-full"/>
              <Button type="primary" htmlType="submit" loading={isSubmit} className="rounded-r-full" icon={<ArrowUpOutlined />}/>
            </Space.Compact>          
        </Form>
    </div>
  );
}
