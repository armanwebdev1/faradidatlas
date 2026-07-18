/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from "next";

import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../../importMap.js";

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = ({
  params,
  searchParams,
}: Args): Promise<Metadata> =>
  generatePageMetadata({
    config,
    params,
    searchParams,
  });

const Page = ({ params, searchParams }: Args) => {
  return (
    <div>
      <div style={{ padding: '4px 8px', background: 'yellow', fontFamily: 'monospace', fontSize: '11px' }}>
        DEBUG: page.tsx rendered for admin
      </div>
      {RootPage({
        config,
        importMap,
        params,
        searchParams,
      })}
    </div>
  );
};

export default Page;
