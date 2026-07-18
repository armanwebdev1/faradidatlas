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

const Page = async ({ params, searchParams }: Args) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  console.log('=== PAYLOAD ADMIN PAGE ===');
  console.log('Segments:', resolvedParams.segments);
  console.log('SearchParams:', JSON.stringify(resolvedSearchParams));

  try {
    const result = RootPage({
      config,
      importMap,
      params: Promise.resolve(resolvedParams),
      searchParams: Promise.resolve(resolvedSearchParams),
    });
    console.log('RootPage returned successfully for:', resolvedParams.segments);
    return result;
  } catch (error) {
    console.error('=== ROOTPAGE ERROR ===', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    throw error;
  }
};

export default Page;
