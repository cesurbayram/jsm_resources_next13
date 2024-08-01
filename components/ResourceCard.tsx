import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

interface Props {
  id: string;
  title: string;
  image: string;
  downloadNumber: number;
  downloadLink: string;
}

const ResourceCard: React.FC<Props> = ({ id, title, image, downloadNumber, downloadLink }) => {
  return (
    <Card className="w-full max-w-fit border-0 !bg-transparent sm:max-w-[365px]">
      <Link href={downloadLink} legacyBehavior>
        <a> {/* Link içindeki elementlerin doğru çalışması için a etiketi ekleyin */}
          <CardHeader className="flex-center flex-col gap-2.5 !p-0">
            <div className="relative h-full rounded-md overflow-hidden">
              <Image
                src={image}
                className="object-cover"
                width={384}
                height={440}
                alt={title}
              />
            </div>
            <CardTitle className="text-white paragraph-semibold line-clamp-1 w-full text-left">{title}</CardTitle>
            <CardDescription>{`Downloaded ${downloadNumber} times`}</CardDescription>
          </CardHeader>
        </a>
      </Link>
      <CardContent className="flex-between mt-4 p-0">
        <div className="flex-center body-medium gap-1.5 text-white">
          <Image 
            src="/downloads.svg"
            width={20}
            height={20}
            alt="download"
          />
          {downloadNumber}
        </div>
        <Link href={downloadLink} legacyBehavior>
          <a className="flex-center text-graidnet_purple-blue body-semibold gap-1.5">
            Download Now
            <Image src="/arrow-blue.svg" width={13} height={13} alt="arrow"/>
          </a>
        </Link>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

export default ResourceCard;
