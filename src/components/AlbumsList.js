import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store";
import AlbumsListItems from "./AlbumsListItems";
import Button from "./Button";
// import ExpandablePanel from "./ExpandablePanel";
import Skeleton from "./Skeleton";

function AlbumsList({ user }) {
  // user argument is sent to the query function in albumsApi
  const { data, error, isFetching } = useFetchAlbumsQuery(user)
  // const result = useFetchAlbumsQuery(user)
  const [addAlbum, results] = useAddAlbumMutation()

  const handleAddAlbum = () => {
    addAlbum(user)
  }

  // console.log(results)

  let content
  if (isFetching) {
    content = <Skeleton times={3} className="h-10 w-full" />
  }
  else if (error) {
    content = <div>Error loading albums</div>
  }
  else {
    content = data.map(album => {
      return <AlbumsListItems key={album.id} album={album} />
    })
  }
  return <div>
    <div className="m-2 flex flex-row items-center justify-between">
      <h3 className="text-lg font-bold">Albums for {user.name}</h3>
      <Button onClick={handleAddAlbum} loading={results.isLoading}>
        + Add Album
      </Button>
    </div>
    <div>
      {content}
    </div>
  </div>;
}

export default AlbumsList;
