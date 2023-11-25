import "../index.css";
import LoggedInContainer from "../containers/LoggedInContainer";
import { createContext } from "react";
export const ThemeContext = createContext(null);

const focusCardsData = [
  {
    title: "Peaceful Piano",
    description: "peaceful piano music for you and your loved ones",
    imgURL:
      "https://www.rollingstone.com/wp-content/uploads/2018/06/rs-nirvana-e9e22e4b-f7d9-4fc7-bd94-23c30084ce94.jpg",
  },
  {
    title: "Peaceful Piano",
    description: "peaceful piano music for you and your loved ones",
    imgURL:
      "https://www.rollingstone.com/wp-content/uploads/2018/06/rs-nirvana-e9e22e4b-f7d9-4fc7-bd94-23c30084ce94.jpg",
  },
  {
    title: "Peaceful Piano",
    description: "peaceful piano music for you and your loved ones",
    imgURL:
      "https://www.rollingstone.com/wp-content/uploads/2018/06/rs-nirvana-e9e22e4b-f7d9-4fc7-bd94-23c30084ce94.jpg",
  },
  {
    title: "Peaceful Piano",
    description: "peaceful piano music for you and your loved ones",
    imgURL:
      "https://www.rollingstone.com/wp-content/uploads/2018/06/rs-nirvana-e9e22e4b-f7d9-4fc7-bd94-23c30084ce94.jpg",
  },
  {
    title: "Peaceful Piano",
    description: "peaceful piano music for you and your loved ones",
    imgURL:
      "https://www.rollingstone.com/wp-content/uploads/2018/06/rs-nirvana-e9e22e4b-f7d9-4fc7-bd94-23c30084ce94.jpg",
  },
];

const LoggedInHome = () => {
  return (
    <LoggedInContainer curActiveScreen={"home"}>
      <div className="p-8 rounded  ">
        <div className="bg-img2  rounded-lg flex flex-col justify-center items-center ">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-black text-white text-border-black text-7xl flex flex-col justify-center items-center">
              Your vinyl experience,
            </h1>
            <h1 className="font-bold p-4	text-white text-6xl justify-center items-center">
              without the vinyl
            </h1>
          </div>
        </div>
      </div>
      <PlaylistView title={"Focus"} cardsData={focusCardsData} />
      <PlaylistView title={"Sounds of India"} cardsData={focusCardsData} />
      <PlaylistView title={"Your Mix"} cardsData={focusCardsData} />
    </LoggedInContainer>
  );
};

const PlaylistView = ({ title, cardsData }) => {
  return (
    <>
      <div className="text-black mt-8">
        <div className="text-2xl font-bold px-1 mb-5">{title}</div>
        <div className="w-full flex justify-between space-x-4 ">
          {cardsData.map((item) => {
            return (
              <Card
                title={item.title}
                description={item.description}
                imgURL={item.imgURL}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

const Card = ({ title, description, imgURL, id }) => {
  return (
    <>
      <div className="classhover cursor-pointer bg-coral rounded-lg w-1/6 p-4 ">
        <div className="hover">
          <img className=" py-5 w-full rounded-md" src={imgURL} />
        </div>
        <div className="text-black text-sm font-semibold py-3">{title}</div>
        <div className="text-white text-sm">{description}</div>
      </div>
    </>
  );
};

export default LoggedInHome;
