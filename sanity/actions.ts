import { groq } from 'next-sanity';
import { readClient } from './lib/client';

interface GetResourcesParams {
  query: string;
  category: string;
  page: string;
}

export const getResources = async (params: GetResourcesParams) => {
  const { query, category, page } = params;

  try {
    const resources = await readClient.fetch(
      groq`*[_type == "resources" && title match $query && category == $category] {
        _id,
        title,
        downloadLink,
        "image": image.asset->url,
        views
      }`
    );
    return resources;
  } catch (error) {
    console.log(error);
  }
};

export const getResourcesPlaylist = async () => {
  try {
    const resources = await readClient.fetch(
      groq`*[_type== "resourcesPlaylist"]{
         _id,
         title,
         respirces[0...6]->{
           title,
           _id,
           downloadLink,
           "image": poster.asset->url,
           views
         }
       }`
    );
    return resources;
  } catch (error) {
    console.log(error);
  }
};
