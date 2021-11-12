import * as MediaLibrary from "expo-media-library";

const ALBUM_NAME = "My Album";

export const saveImageToAlbum = async (photo) => {
    const asset = await MediaLibrary.createAssetAsync(photo.uri);
    const myAlbum = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
    if (myAlbum) {
        await MediaLibrary.addAssetsToAlbumAsync(asset, myAlbum);
    } else {
        await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset);
    }
};
