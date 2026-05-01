import type { DocItem } from '$lib/types/doc';

/**
 * Manual documentation navigation tree.
 * The order of items controls sidebar rendering and previous/next doc navigation.
 *
 * 記事を追加するときの手順：
 * 1. `src/routes/docs/<slug>/+page.svx` を新規作成
 * 2. このファイルの該当グループの `items` に { slug: '<slug>', name: '表示名' } を追加
 *
 * 注意：ここに書いた slug は、その記事ファイルが存在することが前提。
 * 存在しない slug を書くと、クリック時に404になります。
 *
 * グループ名（`name`）は、ページを開いたときの見出しの上に出る「カテゴリ」表示にも
 * そのまま使われます（manifest が親グループの name を子に継承するため）。
 */
export const docsNavigation: DocItem[] = [
	{
		slug: 'intro',
		name: 'はじめに',
		items: [
			{
				slug: '',
				name: 'このサイトについて'
			},
			{
				slug: 'intro/setup',
				name: 'プロジェクトを作る'
			},
			{
				slug: 'intro/svelte-vs-sveltekit',
				name: 'Svelte と SvelteKit'
			},
			{
				slug: 'intro/where-to-write',
				name: '最初はどこに書く？'
			},
			{
				slug: 'intro/cheatsheet',
				name: 'チートシート'
			}
		]
	},
	{
		slug: 'svelte',
		name: 'Svelte 実践基本',
		items: [
			{
				slug: 'svelte/state',
				name: '$state：変わる値'
			},
			{
				slug: 'svelte/derived',
				name: '$derived：自動で計算'
			},
			{
				slug: 'svelte/effect',
				name: '$effect：変化に反応'
			},
			{
				slug: 'svelte/props',
				name: 'props：親から子へ渡す荷物'
			},
			{
				slug: 'svelte/bind',
				name: 'bind：画面とデータをつなぐ'
			},
			{
				slug: 'svelte/if',
				name: '{#if}：条件で表示する'
			},
			{
				slug: 'svelte/each',
				name: '{#each}：リストを並べる'
			},
			{
				slug: 'svelte/class-style',
				name: 'class / style：見た目を変える'
			}
		]
	},
	{
		slug: 'sveltekit',
		name: 'SvelteKit 実践基本',
		items: [
			{
				slug: 'sveltekit/page',
				name: '+page.svelte：ページ本体'
			},
			{
				slug: 'sveltekit/layout',
				name: '+layout.svelte：共通の額縁'
			},
			{
				slug: 'sveltekit/dynamic-routes',
				name: '[slug]：動的ルート'
			},
			{
				slug: 'sveltekit/load',
				name: 'load：表示前の材料集め'
			},
			{
				slug: 'sveltekit/page-server',
				name: '+page.server.ts：サーバー側'
			},
			{
				slug: 'sveltekit/form-actions',
				name: 'form actions：フォームの受付'
			},
			{
				slug: 'sveltekit/api-routes',
				name: '+server.ts：APIを作る'
			},
			{
				slug: 'sveltekit/error-redirect',
				name: 'error / redirect'
			},
			{
				slug: 'sveltekit/hooks',
				name: 'hooks：入口の受付係'
			}
		]
	},
	{
		slug: 'typescript',
		name: 'TypeScript 実践基本',
		items: [
			{
				slug: 'typescript/types',
				name: '型は「名札」'
			},
			{
				slug: 'typescript/type-vs-interface',
				name: 'type / interface'
			},
			{
				slug: 'typescript/union-literal',
				name: 'Union / Literal'
			},
			{
				slug: 'typescript/optional',
				name: 'optional / ?'
			},
			{
				slug: 'typescript/utility-types',
				name: 'Utility Types'
			},
			{
				slug: 'typescript/api-response',
				name: 'APIレスポンス'
			},
			{
				slug: 'typescript/generics',
				name: 'Generics'
			},
			{
				slug: 'typescript/type-guard',
				name: '型ガード'
			},
			{
				slug: 'typescript/result-pattern',
				name: 'Result型'
			}
		]
	},
	{
		slug: 'patterns',
		name: '実務パターン集',
		items: [
			{
				slug: 'patterns/loading-error',
				name: 'loading / error：4状態UI'
			},
			{
				slug: 'patterns/active-nav',
				name: '現在地メニューに下線'
			},
			{
				slug: 'patterns/dark-mode',
				name: 'ダークモード'
			},
			{
				slug: 'patterns/debounce-search',
				name: 'debounce検索'
			}
		]
	},
	{
		slug: 'examples',
		name: '小さなアプリ例',
		items: [
			{
				slug: 'examples/todo',
				name: 'Todo アプリ'
			},
			{
				slug: 'examples/todo-localstorage',
				name: 'Todo localStorage版'
			},
			{
				slug: 'examples/todo-server',
				name: 'Todo server版'
			},
			{
				slug: 'examples/notice-board',
				name: 'お知らせ一覧'
			},
			{
				slug: 'examples/search-list',
				name: '検索リスト'
			},
			{
				slug: 'examples/admin-board',
				name: 'お知らせ管理画面'
			},
			{
				slug: 'examples/search-list-server',
				name: 'サーバー検索リスト'
			},
			{
				slug: 'examples/login-form',
				name: 'ログインフォーム'
			}
		]
	}
];
