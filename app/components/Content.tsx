import { UserOutlined, BugOutlined, CopyFilled, CopyOutlined, LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function Content({
  message,
  content,
}: {
  message: string;
  content: string;
}) {


    const [like,setLike]=useState(false);
    const [copy,setCopy]=useState(false);
    const [dislike,setDisLike]=useState(false);

    function updateLike(){
        setLike(!like);
        setDisLike(state=>state===true?false:state);
    }

    function updateDislike(){
        
        setDisLike(!dislike);
        setLike(state=>state===true?false:state);
    }

    function getCopy(response:string){
        setCopy(!copy);
        console.log(response);
    }

  return (
    <>
      <div className="flex flex-col">
        <h5 className="text-sm self-end hover:shadow-inner hover:border hover:cursor-pointer p-1 hover:border-blue-300 rounded-md">
          <UserOutlined /> rémi
        </h5>
        <p className="self-end p-2 rounded-3xl bg-gray-200">{message}</p>
      </div>
      <div className="flex flex-col">
        <h5 className="text-sm self-start hover:shadow-inner rounded-md hover:cursor-pointer p-1 hover:border hover:border-blue-300">
          <BugOutlined /> Mistral
        </h5>
        <p className="text-justify mr-10">{content}</p>
      </div>
      <div className="flex self.start space-x-5">
        {copy ? (
          <CopyFilled
            onClick={() => getCopy(content)}
            className="hover:cursor-pointer hover:p-1 hover:shadow-inner hover:rounded-md hover:bg-gray-700"
          />
        ) : (
          <CopyOutlined
            onClick={() => getCopy(content)}
            className="hover:cursor-pointer hover:p-1 hover:shadow-inner hover:rounded-md hover:bg-gray-700"
          />
        )}
        {like ? (
          <LikeFilled
            onClick={() => updateLike()}
            className="hover:cursor-pointer hover:p-1 hover:shadow-inner hover:rounded-md hover:bg-gray-700"
          />
        ) : (
          <LikeOutlined
            onClick={() => updateLike()}
            className="hover:cursor-pointer hover:p-1 hover:shadow-inner hover:rounded-md hover:bg-gray-700"
          />
        )}
        {dislike ? (
          <DislikeFilled
            onClick={() => updateDislike()}
            className="hover:cursor-pointer hover:p-1 hover:shadow-inner hover:rounded-md hover:bg-gray-700"
          />
        ) : (
          <DislikeOutlined
            onClick={() => updateDislike()}
            className="hover:cursor-pointer hover:p-1 hover:shadow-inner hover:rounded-md hover:bg-gray-700"
          />
        )}
      </div>
    </>
  );
}
