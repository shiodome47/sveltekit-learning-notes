/**
 * Canonical site-level metadata shared across SEO tags, manifests, and feeds.
 * Keep this object project-specific when using the docs template for a new brand.
 */
export const siteConfig = {
	/** Primary site name used in titles and Open Graph site fields. */
	name: 'Svelte & TypeScript Learning Notes',
	/** Compact site name for environments with strict length limits. */
	shortName: 'Svelte & TS Notes',
	/** Public canonical URL used to build absolute links. */
	url: 'http://localhost:5173',
	/** Default SEO description for the homepage and fallback metadata. */
	description:
		'小学生にもわかるくらい、SvelteとTypeScriptをやさしく学ぶノート。$state、+page.svelte、load、form actions、TypeScriptの「型」を、たとえ話と短いコードで説明します。',
	/** Author shown in metadata and structured data. */
	author: 'Me',
	/** Primary SEO keywords for indexing and discovery. */
	keywords: [
		'svelte',
		'sveltekit',
		'typescript',
		'初心者',
		'入門',
		'学習ノート',
		'やさしい',
		'チュートリアル',
		'web開発'
	],
	/** Default social preview image path. */
	ogImage: '/og-image.jpg',
	/** External profile links used by docs actions and metadata. */
	links: {
		github: 'https://github.com/',
		twitter: 'https://example.com/'
	},
	/** Package metadata used in installation snippets and docs helpers. */
	package: {
		name: 'svelte'
	}
};

/** Inferred type for strongly-typed consumers of `siteConfig`. */
export type SiteConfig = typeof siteConfig;
