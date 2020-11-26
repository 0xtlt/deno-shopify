import type { Asset, ConfigShopify, Page, Theme } from "./types.d.ts";
import { PageCreate, PageEndpoints } from "./types/page.d.ts";
import { jsonToURL } from "./utils.ts";

class Shopify {
  private config: ConfigShopify;
  constructor(config: ConfigShopify) {
    this.config = config;
  }

  make(path: string): string {
    return `https://${this.config.apiKey}:${this.config.password}@${this.config.myshopify}/admin/api/2020-10/${path}`;
  }

  // Themes
  async getThemes(): Promise<Theme[]> {
    const response = (await (await fetch(this.make("themes.json")))
      .json()).themes as Theme[];

    return response;
  }

  async getTheme(themeId: number): Promise<Theme> {
    return (await (await fetch(this.make(`themes/${themeId}.json`)))
      .json()).theme as Theme;
  }

  async mainTheme(): Promise<Theme | null> {
    const themes = await this.getThemes();

    const theme = themes.filter((theme) => theme.role === "main");

    if (theme.length === 1) {
      return theme[0];
    }

    return null;
  }

  async createTheme(
    theme: { name: string; src: string; role: "main" | "unpublished" },
  ): Promise<Theme> {
    return (await (await fetch(this.make("themes.json"), {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(theme),
    })).json()).theme as Theme;
  }

  async updateTheme(
    themeId: number,
    config: { name?: string; role?: "main" | "unpublished" },
  ): Promise<Theme> {
    return (await (await fetch(this.make(`themes/${themeId}json`), {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(config),
    })).json()).theme as Theme;
  }

  async deleteTheme(themeId: string): Promise<Theme> {
    return (await (await fetch(
      this.make(`themes/${themeId}.json`),
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    )).json()).asset as Theme;
  }

  // Assets
  async getAssets(themeId: number): Promise<Asset[]> {
    return (await (await fetch(
      this.make(`themes/${themeId}/assets.json`),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    )).json()).assets as Asset[];
  }

  async createAsset(
    themeId: number,
    path: string,
    value: {
      value?: string;
      attachment?: string;
      src?: string;
      source_key?: string;
    },
  ): Promise<Asset> {
    const response =
      (await (await fetch(this.make(`themes/${themeId}/assets.json`), {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          "asset": {
            "key": path,
            ...value,
          },
        }),
      })).json()).asset as Asset;

    return response;
  }

  async deleteAsset(
    themeId: string,
    path: string,
  ): Promise<{ message: string }> {
    const response = (await (await fetch(
      this.make(`themes/${themeId}/assets.json?asset[key]=${path}`),
      {
        method: "DELETE",
      },
    )).json()).asset as { message: string };

    return response;
  }

  // Pages
  async getPages(params?: PageEndpoints): Promise<Page[]> {
    return (await (await fetch(
      this.make("pages.json" + (params ? `?${jsonToURL(params)}` : "")),
    ))
      .json()).pages as Page[];
  }

  async countPages(params?: PageEndpoints): Promise<number> {
    return (await (await fetch(
      this.make("count.json" + (params ? `?${jsonToURL(params)}` : "")),
    ))
      .json()).count as number;
  }

  async getPage(pageId: number): Promise<Page> {
    return (await (await fetch(
      this.make(`pages/${pageId}.json`),
    ))
      .json()).page as Page;
  }

  async createPage(params: PageCreate): Promise<Page> {
    return (await (await fetch(this.make("pages.json"), {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ page: params }),
    })).json()).page as Page;
  }

  async updatePage(pageId: number, params: PageCreate): Promise<Page> {
    return (await (await fetch(this.make(`pages/${pageId}.json`), {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ page: { id: pageId, ...params } }),
    })).json()).page as Page;
  }

  async deletePage(pageId: number): Promise<void> {
    (await (await fetch(
      this.make(`pages/${pageId}.json`),
      { method: "DELETE" },
    )).json());

    return;
  }
}

export default Shopify;
