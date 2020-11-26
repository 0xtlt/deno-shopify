import { Metafield } from "./metafield.d.ts";

type Page = {
  id: number;
  title: string;
  shop_id: number;
  handle: string;
  body_html: string;
  author: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  template_suffix: string | null;
  metafields?: Metafield[];
  admin_graphql_api_id: string;
};

type PageCreate = {
  title: string;
  shop_id?: number;
  handle?: string;
  body_html?: string;
  author?: string;
  published_at?: string;
  template_suffix?: string;
  published?: boolean;
  metafields?: Metafield[];
};

type PageEndpoints = {
  limit?: number;
  since_id?: number;
  title?: string;
  handle?: string;
  created_at_min?: string;
  created_at_max?: string;
  updated_at_min?: string;
  published_at_min?: string;
  published_at_max?: string;
  fields?: string;
  published_status?: "any" | "published" | "unpublished";
};

export type { Page, PageCreate, PageEndpoints };
