type Asset = {
  key: string;
  public_url: string | null;
  created_at: string;
  updated_at: string;
  content_type: string;
  size: number;
  checksum: string;
  theme_id: number;
};

export type { Asset };
