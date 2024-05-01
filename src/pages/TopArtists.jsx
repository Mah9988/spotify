import { Error, Loader, ArtistCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazameCore";

const API_KEY = "at_BL1JMyoDjY1evsKesEzRegKkFX9Rk";
const TopArtists = () => {
  const { data, isFetching, error } = useGetSongsByCountryQuery("JP");

  if (isFetching) {
    return <Loader title="Loading top artists !" />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Artists
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
