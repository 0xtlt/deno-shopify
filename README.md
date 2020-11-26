# Deno Shopify

## Configuration

```typescript
import { Shopify } from "https://deno.land/x/deno_shopify@v0.1.2/mod.ts";

const shop = new Shopify({
  apiKey: "...",
  password: "...",
  myshopify: "[...].myshopify.com",
});
```

## Themes

### Get all themes

Returns an object array of [Theme](/types/theme.d.ts)

```typscript
getThemes(): Promise<Theme[]>
```

### Get theme

Returns the [Theme](/types/theme.d.ts) associated object

```typescript
getTheme(themeId: number): Promise<Theme>
```

### Get the main theme

Returns the actual main [Theme](/types/theme.d.ts) of your Shop

```typescript
mainTheme(): Promise<Theme | null>
```

### Create theme

Create and returns a new [Theme](/types/theme.d.ts).  
[Shopify documentation](https://shopify.dev/docs/admin-api/rest/reference/online-store/theme?api%5Bversion%5D=2020-10)

```typescript
createTheme(theme: {
  name: string;
  src: string;
  role: "main" | "unpublished"
 }): Promise<Theme>
```

### Update theme

Update and returns a [Theme](/types/theme.d.ts).  
[Shopify documentation](https://shopify.dev/docs/admin-api/rest/reference/online-store/theme?api%5Bversion%5D=2020-10)

```typescript
async updateTheme(
  themeId: number,
  config: {
    name?: string;
    role?: "main" | "unpublished"
  },
): Promise<Theme>
```

### Delete theme

Delete and returns a [Theme](/types/theme.d.ts).  
[Shopify documentation](https://shopify.dev/docs/admin-api/rest/reference/online-store/theme?api%5Bversion%5D=2020-10)

```typescript
async deleteTheme(themeId: string): Promise<Theme>
```

## Assets

### Get an asset

Retrieve an [Asset](/types/asset.d.ts).  
[Shopify documentation](https://shopify.dev/docs/admin-api/rest/reference/online-store/asset?api%5Bversion%5D=2020-10) object

```typescript
async getAssets(themeId: number): Promise<Asset[]>
```

### Create an asset

Create and returns an [Asset](/types/asset.d.ts).  
[Shopify documentation](https://shopify.dev/docs/admin-api/rest/reference/online-store/asset?api%5Bversion%5D=2020-10) object

```typescript
async createAsset(
  themeId: number,
  path: string,
  value: {
    value?: string;
    attachment?: string;
    src?: string;
    source_key?: string;
  },
): Promise<Asset>
```

### Delete an asset

```typescript
async deleteAsset(
  themeId: string,
  path: string,
): Promise<{ message: string }>
```

## Pages

[Shopify documentation](https://shopify.dev/docs/admin-api/rest/reference/online-store/page?api%5Bversion%5D=2020-10)

### Get pages

Returns an object array of [Page](/types/page.d.ts) with [Endpoints](/types/page.d.ts)

```typscript
getPages(params?: PageEndpoints): Promise<Page[]>
```

### Get page

Returns the [Page](/types/page.d.ts) associated object with [Endpoints](/types/page.d.ts)

```typscript
async getPage(pageId: number): Promise<Page>
```

### Count pages

Returns the number of pages with [Endpoints](/types/page.d.ts)

```typscript
async countPages(params?: PageEndpoints): Promise<number>
```

### Create page

Create a new [Page](/types/page.d.ts)

```typescript
async createPage(params: PageCreate): Promise<Page>
```

### Update page

Update a [Page](/types/page.d.ts)

```typescript
async updatePage(pageId: number, params: PageCreate): Promise<Page>
```

### Delete page

Delete a [Page](/types/page.d.ts)

```typescript
async deletePage(pageId: number): Promise<void>
```
