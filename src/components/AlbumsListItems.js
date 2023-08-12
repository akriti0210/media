import React from 'react'
import ExpandablePanel from './ExpandablePanel'
import Button from './Button'
import { GoTrash } from 'react-icons/go'
import { useRemoveAlbumMutation } from '../store'
import PhotosList from './PhotosList'

function AlbumsListItems({ album }) {
    const [removeAlbum, results] = useRemoveAlbumMutation()
    
    const handleRemoveAlbum = () => {
        removeAlbum(album)
    }

    const header = (
        <>
            <Button
                className="mr-2"
                loading={results.isLoading}
                onClick={handleRemoveAlbum}>
                <GoTrash />
            </Button>
            {album.title}
        </>
    )
    return (
        <div>
            <ExpandablePanel key={album.id} header={header}>
                <PhotosList album={album} />
            </ExpandablePanel>
        </div>
    )
}

export default AlbumsListItems