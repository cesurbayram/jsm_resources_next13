"use client"

import { formUrlQuery } from '@/sanity/utils';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const links: string[] = ['all', 'Next 13', 'frontend', 'backend', 'fullstack']

const Filters: React.FC = () => {
    const [active, setActive] = useState<string>('');
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleFilter = (link: string) => {
        let newUrl = '';
        
        if (active === link) {
            setActive('');
        
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'category',  // add key property
                value: '',  // provide a value to remove the category
                keysToRemove: ['category'],
            });
        } else {
            setActive(link);
        
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'category',
                value: link.toLowerCase(),
            });
        }        
        router.push(newUrl, { scroll: false });
    }

    console.log({ currentLink: active });

    return (
        <ul className="text-white-800 body-text no-scrollbar flex w-full max-w-full gap-2 overflow-auto py-12 sm:max-w-2xl">
            {links.map((link) => (
                <li key={link}>
                    <button
                        onClick={() => handleFilter(link)}
                        className={`${active === link ? 'gradient_blue-purple' : ''} whitespace-nowrap rounded-lg px-8 py-2.5 capitalize`}
                    >
                        {link}
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default Filters;
