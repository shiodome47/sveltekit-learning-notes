<script lang="ts">
	type Notice = {
		slug: string;
		title: string;
		excerpt: string;
		category: string;
	};

	type AppError = {
		message: string;
		status?: number;
	};

	type Result<T, E> = { ok: true; data: T } | { ok: false; error: E };

	type State =
		| { kind: 'idle' }
		| { kind: 'loading' }
		| { kind: 'error'; message: string }
		| { kind: 'success'; results: Notice[]; query: string };

	const allNotices: Notice[] = [
		{ slug: 'jizobon', title: '地蔵盆のお知らせ', excerpt: '8月23日（土）に開催します。', category: '行事' },
		{ slug: 'bousai-training', title: '防災訓練のお知らせ', excerpt: '9月7日（日）に行います。', category: '防災' },
		{ slug: 'yakuinkai', title: '役員会のお知らせ', excerpt: '10月5日（日）に開催します。', category: '会議' },
		{ slug: 'kodomo-natsu', title: '子ども会・夏祭り', excerpt: '夏祭りのスタッフを募集します。', category: '子ども会' },
		{ slug: 'gomi-rule', title: 'ゴミ出しルール変更', excerpt: '燃えないゴミの曜日が変わります。', category: '環境' },
		{ slug: 'taifu-junbi', title: '台風シーズンのご案内', excerpt: '備蓄品リストと避難所情報。', category: '防災' },
		{ slug: 'soujishuukan', title: '清掃週間のお知らせ', excerpt: '町内一斉の清掃週間を行います。', category: '環境' },
		{ slug: 'kaihi-2025', title: '令和7年度 会費納入のお願い', excerpt: '今年度の町内会費の集金。', category: '連絡' }
	];

	// 疑似サーバー検索：実務では fetch('/api/notices/search?q=...') に置きかえる
	async function fetchSearchResults(query: string): Promise<Result<Notice[], AppError>> {
		// サーバー応答の遅さを再現
		await new Promise((r) => setTimeout(r, 600));

		if (query.toLowerCase().includes('error')) {
			return {
				ok: false,
				error: { message: 'サーバーエラーが発生しました', status: 500 }
			};
		}

		const results = allNotices.filter(
			(n) =>
				n.title.includes(query) || n.excerpt.includes(query) || n.category.includes(query)
		);

		return { ok: true, data: results };
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
			const result = await fetchSearchResults(q);
			if (cancelled) return;
			if (result.ok) {
				state = { kind: 'success', results: result.data, query: q };
			} else {
				state = { kind: 'error', message: result.error.message };
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
	<h2>お知らせ検索（サーバー検索版）</h2>
	<p class="hint">
		debounce 500ms ＋ 疑似サーバー応答 600ms。<br />
		<code>error</code> と入れると、サーバーエラーを再現します。
	</p>

	<div class="row">
		<input type="search" bind:value={query} placeholder="検索ワード（例：防災 / 環境 / 役員）" />
		{#if query !== ''}
			<button type="button" onclick={clearQuery}>クリア</button>
		{/if}
	</div>

	{#if state.kind === 'idle'}
		<p class="placeholder">検索ワードを入れてください</p>
	{:else if state.kind === 'loading'}
		<p class="placeholder">サーバーに問い合わせ中…</p>
	{:else if state.kind === 'error'}
		<p class="error">⚠ {state.message}</p>
	{:else if state.results.length === 0}
		<p class="placeholder">「{state.query}」に合うお知らせは見つかりません</p>
	{:else}
		<p class="count">{state.results.length} 件見つかりました</p>
		<ul>
			{#each state.results as notice (notice.slug)}
				<li>
					<span class="cat">{notice.category}</span>
					<strong>{notice.title}</strong>
					<span class="excerpt">{notice.excerpt}</span>
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
		max-width: 32rem;
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
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-areas: 'cat title' 'cat excerpt';
		gap: 0.15rem 0.6rem;
		padding: 0.55rem 0.75rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		opacity: 0.95;
	}
	li .cat {
		grid-area: cat;
		align-self: center;
		font-size: 0.72rem;
		padding: 0.05rem 0.4rem;
		border: 1px solid currentColor;
		border-radius: 9999px;
		opacity: 0.8;
	}
	li strong {
		grid-area: title;
		font-weight: 600;
	}
	li .excerpt {
		grid-area: excerpt;
		font-size: 0.82rem;
		opacity: 0.7;
	}
</style>
