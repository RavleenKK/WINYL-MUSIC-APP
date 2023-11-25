import logo from "../../src/logotr.png";
import { Icon } from "@iconify/react";
import TextHover from "../components/shared/TextHover";

import { useState, useLayoutEffect, useRef } from "react";
import IconText from "../components/shared/IconText";
import "../index.css";
import { Howl } from "howler";
import songContext from "../contexts/songContext";
import { useContext } from "react";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";

const LoggedInContainer = ({ children, curActiveScreen, Mode }) => {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  const [username, setUsername] = useState("");

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    // the following if statement will prevent the useEffect from running on the first render.
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong && currentSong.track]);

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;

    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    if (response._id) {
      setAddToPlaylistModalOpen(false);
    }
  };

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  return (
    <div className="h-full w-full">
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
        <div className="left-panel">
          <div className="flex flex-col justify-between">
            {/* left panel */}
            <div className="logo w-40">
              <img src={logo} alt="hello" />
            </div>

            <div className="py-2 px-5 ">
              <IconText
                targetLink={"/LoggedInHome"}
                iconName={"material-symbols:home"}
                display={"Home"}
                active={curActiveScreen === "home"}
              />
              <IconText
                iconName={"material-symbols:search"}
                display={"Search"}
                active={curActiveScreen === "search"}
                targetLink={"/Search"}
              />
              <IconText
                iconName={"fluent:library-20-filled"}
                display={"Library"}
                active={curActiveScreen === "Library"}
                targetLink={"/Library"}
              />
              <IconText
                iconName={"material-symbols:library-music"}
                display={"My Music"}
                targetLink={"/MyMusic"}
                active={curActiveScreen === "MyMusic"}
              />
            </div>
            <div className="py-10 px-5">
              <IconText
                iconName={"icon-park-solid:add"}
                display={"Create playlist"}
                onClick={() => {
                  setCreatePlaylistModalOpen(true);
                }}
              />
              <IconText
                iconName={"solar:heart-bold-duotone"}
                display={"Liked songs"}
              />
            </div>

            <div className="px-10 py-20 flex py-0">
              <div className="cursor-pointer  ">
                <div className="ml-2 text-sm font-semibold hover:text-grey">
                  <div>
                    <input type="checkbox" className="checkbox" id="checkbox" />
                    <label htmlFor="checkbox" className="checkbox-label">
                      <Icon
                        icon="akar-icons:moon-fill"
                        color="black"
                        fontSize={18}
                      />
                      <Icon icon="fa-solid:sun" color="#f1410d" fontSize={18} />
                      <span className="ball"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full w-4/5 overflow-auto ">
          <div className="navbar w-full h-24 bg-black  opacity-90 flex items-center justify-end ">
            <div className="w-1/2 flex h-full">
              <div className="w-2/3 flex justify-around items-center">
                <TextHover display={"Premium"} />
                <TextHover display={"Support"} />
                <TextHover display={"Download"} />
                <div className="h-1/2 border-r border-white"></div>
              </div>
              <div className="w-1/3 flex justify-around h-full items-center">
                <TextHover display={"Upload Song"} targetLink={"/UploadSong"} />
                <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                  RK
                </div>
              </div>
            </div>
          </div>
          <div className="content p-7 pt-0  overflow-auto ">{children}</div>
        </div>
      </div>
      {/* current playing song */}
      {currentSong && (
        <div
          className="h-1/10 w-full bg-app-black
       opacity-90 flex text-white flex items-center p-3"
        >
          <div className="w-1/4 flex items-center">
            <img
              src={currentSong.thumbnail}
              alt="currentSongThumbail"
              className="h-14 w-14 rounded"
            />
            <div className="text-white pl-4 flex flex-col items-center justify center flex center ">
              <div className="cursor-pointer">{currentSong.name}</div>
              <div className="text-xs cursor-pointer  text-gray-400 ">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>

          <div className="w-1/2 h-full flex justify-center flex-col items-center">
            <div className="flex items-center justify-between space-x-8  ">
              <Icon
                icon="mingcute:shuffle-line"
                className="cursor-pointer h-6 w-6 hover:text-red-600"
              />

              <Icon
                icon="ant-design:backward-outlined"
                className="cursor-pointer h-6 w-6 text-coral hover:text-red-600"
              />
              <Icon
                icon={isPaused ? "carbon:play-filled" : "carbon:pause-filled"}
                className="hover:text-red-600 cursor-pointer h-10 w-10"
                onClick={togglePlayPause}
              />
              <Icon
                icon="ant-design:forward-outlined"
                className="cursor-pointer h-6 w-6 hover:text-red-600"
              />
              <Icon
                icon="icomoon-free:loop"
                className="cursor-pointer text-coral h-5 w-5 hover:text-red-600"
              />
            </div>
            {/* <div>progress bar</div> */}
          </div>
          <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
            <Icon
              icon="ic:round-playlist-add"
              fontSize={30}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={() => {
                setAddToPlaylistModalOpen(true);
              }}
            />
            <Icon
              icon="ph:heart-bold"
              fontSize={25}
              className="cursor-pointer text-gray-500 hover:text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInContainer;
