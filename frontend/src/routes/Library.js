import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";

const Library = () => {
  const [myPlaylists, setMyPlaylists] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setMyPlaylists(response.data);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer curActiveScreen={"library"}>
      <div className="p-8 rounded  ">
        <div className="bg-img3 rounded-lg flex flex-col justify-center items-center ">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-black text-white text-border-black text-7xl flex flex-col justify-center items-center">
              Your Library
            </h1>
          </div>
        </div>
      </div>
      <div className="text-black text-xl px-7 pt-3 font-semibold">
        My Playlists
      </div>
      <div className="py-7 px-5 grid gap-5 grid-cols-5">
        {myPlaylists.map((item) => {
          return (
            <Card
              key={JSON.stringify(item)}
              title={item.name}
              description=""
              imgUrl={item.thumbnail}
              playlistId={item._id}
            />
          );
        })}
      </div>
    </LoggedInContainer>
  );
};

const Card = ({ title, description, imgUrl, playlistId }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-black bg-opacity-40 w-full p-4 rounded-lg cursor-pointer"
      onClick={() => {
        navigate("/playlist/" + playlistId);
      }}
    >
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md" src={imgUrl} alt="label" />
      </div>
      <div className="text-black font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default Library;
