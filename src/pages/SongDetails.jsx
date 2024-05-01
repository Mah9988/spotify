import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Error, DetailsHeader, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazameCore";
const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data,
    isFetching: isFetchinRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ songid });
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });

  const handlePause = () => {
    dispatch(playPause(false));
  };
  const handlePlay = (song, i) => {
    dispatch(
      setActiveSong({
        song,
        data,
        i,
      })
    );
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchinRelatedSongs)
    return <Loader title={"Searching song details"} />;

  if (error) {
    return <Error />;
  }
  return (
    <div className="flex flex-col ">
      <DetailsHeader artistId={""} songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics :</h2>

        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData.sections[1].text.map((line, i) => (
              <p className="text-gray-400 text-base my-1">{line}</p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyrics found!
            </p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePlay={handlePlay}
        handlePause={handlePause}
      />
    </div>
  );
};

export default SongDetails;
