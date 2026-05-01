<script lang="ts">
	type Notice = {
		slug: string;
		title: string;
		excerpt: string;
	};

	type State =
		| { kind: 'idle' }
		| { kind: 'loading' }
		| { kind: 'error'; message: string }
		| { kind: 'success'; results: Notice[] };

	const allNotices: Notice[] = [
		{ slug: 'jizobon', title: '地蔵盆のお知らせ', excerpt: '8月23日（土）に開催します。' },
		{ slug: 'bousai-training', title: '防災訓練のお知らせ', excerpt: '9月7日（日）に行います。' },
		{ slug: 'yakuinkai', title: '役員会のお知らせ', excerpt: '10月5日（日）に開催します。' },
		{ slug: 'kodomo-natsu', title: '子ども会・夏祭り', excerpt: '8月10日に夏祭りを開催。' },
		{ slug: 'gomi-rule', title: 'ゴミ出しルール変更', excerpt: '燃えないゴミの曜日が変わります。' },
		{ slug: 'taifu', title: '台風シーズンのご案内', excerpt: '備蓄品リストと避難所情報。' }
	];

	// 疑似検索：実務では fetch('/api/notices/search?q=...') に置きかえる
	async function searchNotices(query: string): Promise<Notice[]> {
		await new Promise((r) => setTimeout(r, 300));
		if (query.toLowerCase().includes('error')) {
			throw new Error('検索サーバーに接続できませんでした');
		}
		return allNotices.filter(
			(n) => n.title.includes(query) || n.excerpt.includes(query)
		);
	}

	let query = $state('');
	let state = $state<State>({ kind: 'idle' });

	$effect(() => {
		const q = query.trim();

		if (q === '') {
			state = { kind: 'idle' };
			return;
		}

		let cancelled = false;

		const timer = setTimeout(async () => {
			state = { kind: 'loading' };
			try {
				const results = await searchNotices(q);
				if (cancelled) return;
				state = { kind: 'success', results };
			} catch (e) {
				if (cancelled) return;
				const message = e instanceof Error ? e.message : '不明なエラー';
				state = { kind: 'error', message };
			}
		}, 500);

		return () => {
			cancelled = true;
			clearTimeout(timer);
		};
	});

	function clearQuery() {
		query = '';
	}
</script>

<section class="search">
	<h2>お知らせ検索（debounce 500ms）</h2>
	<p class="hint">
		入力するとタイマーが走り、止まって 500ms で検索します。<br />
		<code>error</code> と入れると、わざと失敗します。
	</p>

	<div class="row">
		<input type="search" bind:value={query} placeholder="検索ワード（例：防災）" />
		{#if query !== ''}
			<button type="button" onclick={clearQuery}>クリア</button>
		{/if}
	</div>

	{#if state.kind === 'idle'}
		<p class="placeholder">検索ワードを入れてください</p>
	{:else if state.kind === 'loading'}
		<p class="placeholder">読み込み中…</p>
	{:else if state.kind === 'error'}
		<p class="error">⚠ {state.message}</p>
	{:else if state.results.length === 0}
		<p class="placeholder">「{query}」に合うお知らせは見つかりません</p>
	{:else}
		<p class="count">{state.results.length} 件見つかりました</p>
		<ul>
			{#each state.results as notice (notice.slug)}
				<li>
					<strong>{notice.title}</strong>
					<span>{notice.excerpt}</span>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.search {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
		max-width: 30rem;
		padding: 1.5rem;
		font-size: 0.9rem;
	}
	h2 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
	}
	.hint {
		margin: 0;
		font-size: 0.78rem;
		opacity: 0.65;
		line-height: 1.5;
	}
	.hint code {
		font-size: 0.78rem;
		padding: 0.05rem 0.3rem;
		border-radius: 0.25rem;
		border: 1px solid currentColor;
		opacity: 0.85;
	}
	.row {
		display: flex;
		gap: 0.5rem;
	}
	input[type='search'] {
		flex: 1;
		padding: 0.5rem 0.75rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		background: transparent;
		color: inherit;
		font: inherit;
		opacity: 0.95;
	}
	input[type='search']:focus {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}
	button {
		padding: 0.4rem 0.9rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		background: transparent;
		color: inherit;
		font: inherit;
		cursor: pointer;
		opacity: 0.85;
	}
	button:hover {
		opacity: 1;
	}
	.placeholder {
		margin: 0;
		padding: 1rem;
		text-align: center;
		opacity: 0.65;
		border: 1px dashed currentColor;
		border-radius: 0.375rem;
	}
	.error {
		margin: 0;
		padding: 0.6rem 0.8rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		font-weight: 500;
	}
	.count {
		margin: 0;
		font-size: 0.78rem;
		opacity: 0.7;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	li {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		padding: 0.55rem 0.75rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		opacity: 0.95;
	}
	li strong {
		font-weight: 600;
	}
	li span {
		font-size: 0.82rem;
		opacity: 0.7;
	}
</style>
