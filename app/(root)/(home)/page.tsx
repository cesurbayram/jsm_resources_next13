'use client';

import React, { useEffect, useState } from 'react';
import Filters from '@/components/Filters';
import ResourceCard from '@/components/ResourceCard';
import SearchForm from '@/components/SearchForm';
import { getResources, getResourcesPlaylist } from '@/sanity/actions';
import Header from '@/components/Header';

interface Props {
  searchParams: { [key: string]: string | undefined }
}

const Page: React.FC<Props> = ({ searchParams }) => {
  const [resources, setResources] = useState<any[]>([]);
  const [resourcesPlaylist, setResourcesPlaylist] = useState<any[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      const res = await getResources({
        query: searchParams?.query || '',
        category: searchParams?.category || '',
        page: '1'
      });
      setResources(res);
    };

    fetchResources();
  }, [searchParams]);

  useEffect(() => {
    const fetchResourcesPlaylist = async () => {
      const playlist = await getResourcesPlaylist();
      setResourcesPlaylist(playlist);
    };

    fetchResourcesPlaylist();
  }, []);

  return (
    <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col">
      <section className="nav-padding w-full">
        <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl bg-banner bg-cover bg-center text-center">
          <h1 className="sm:heading1 heading2 mb-6 text-center text-white">Javascript Mastery Resources</h1>
        </div>
        <SearchForm />
      </section>

      <Filters />
      {(searchParams?.query || searchParams?.category) && (
        <section className="flex-center mt-6 w-full flex-col sm:mt-20">
          <header>
            <Header 
              title="resources"
              query={searchParams?.query || ''}
              category={searchParams?.category || ''}
            />
          </header>

          <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
            {resources?.length > 0 ? (
              resources.map((resource: any) => (
                <ResourceCard
                  key={resource._id}
                  title={resource.title}
                  id={resource._id}
                  image={resource.image}
                  downloadNumber={resource.views}
                  downloadLink={resource.downloadLink}
                />
              ))
            ) : (
              <p className="body-regular text-white-400">
                No resources found
              </p>
            )}
          </div>
        </section>
      )}
      {resourcesPlaylist.map((item: any) => (
        <section key={item._id} className="flex-center mt-6 w-full flex-col sm:mt-20">
          <h1 className="heading3 self-start text-white-800">{item.title}</h1>
          <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
            {item.resources.map((resource: any) => (
              <ResourceCard
                key={resource._id}
                title={resource.title}
                id={resource._id}
                image={resource.image}
                downloadNumber={resource.views}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default Page;

export const config = {
  revalidate: 900
};
