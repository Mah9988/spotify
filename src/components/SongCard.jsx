import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { logo } from "../assets";
const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();

  const handlePause = () => {
    dispatch(playPause(false));
  };
  const handlePlay = () => {
    dispatch(
      setActiveSong({
        song,
        data,
        i,
      })
    );
    dispatch(playPause(true));
  };
  return (
    <div className="felx flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title
              ? "felx bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePause}
            handlePlay={handlePlay}
          />
        </div>
        {song.images?.coverart ? (
          <img src={song.images?.coverart} alt="songs_img" />
        ) : (
          <img src={logo} alt="songs_img" />
        )}
      </div>
      <div className="mt-4 felx flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
