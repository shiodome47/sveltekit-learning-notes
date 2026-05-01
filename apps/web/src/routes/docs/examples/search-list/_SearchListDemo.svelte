<script lang="ts">
	type Notice = {
		slug: string;
		title: string;
		excerpt: string;
		category: string;
		date: string;
	};

	const notices: Notice[] = [
		{
			slug: 'jizobon',
			title: '地蔵盆のお知らせ',
			excerpt: '今年も町内の地蔵盆を開催します。',
			category: '行事',
			date: '2025-08-23'
		},
		{
			slug: 'bousai-training',
			title: '防災訓練のお知らせ',
			excerpt: '町内合同の防災訓練を行います。',
			category: '防災',
			date: '2025-09-07'
		},
		{
			slug: 'yakuinkai',
			title: '役員会のお知らせ',
			excerpt: '次年度の役員会を開きます。',
			category: '会議',
			date: '2025-10-05'
		},
		{
			slug: 'kodomo-natsu',
			title: '子ども会・夏祭り',
			excerpt: '夏祭りのスタッフを募集します。',
			category: '子ども会',
			date: '2025-07-20'
		},
		{
			slug: 'gomi-rule',
			title: 'ゴミ出しルール変更',
			excerpt: '燃えないゴミの曜日が変わります。',
			category: '環境',
			date: '2025-06-15'
		},
		{
			slug: 'taifu-junbi',
			title: '台風シーズンのご案内',
			excerpt: '備蓄品リストと避難所情報をまとめました。',
			category: '防災',
			date: '2025-08-30'
		},
		{
			slug: 'soujishuukan',
			title: '清掃週間のお知らせ',
			excerpt: '町内一斉の清掃週間を行います。',
			category: '環境',
			date: '2025-04-12'
		},
		{
			slug: 'kaihi-2025',
			title: '令和7年度 会費納入のお願い',
			excerpt: '今年度の町内会費の集金についてのご案内です。',
			category: '連絡',
			date: '2025-05-01'
		}
	];

	let query = $state('');
	let selectedSlug = $state<string | null>(null);

	const q = $derived(query.trim());

	const filteredNotices = $derived(
		q === ''
			? notices
			: notices.filter((n) => [n.title, n.excerpt, n.category].some((s) => s.includes(q)))
	);

	const selectedNotice = $derived(
		selectedSlug ? (notices.find((n) => n.slug === selectedSlug) ?? null) : null
	);

	function select(slug: string) {
		selectedSlug = slug === selectedSlug ? null : slug;
	}

	function clearQuery() {
		query = '';
	}
</script>

<section class="search">
	<h2>お知らせを検索</h2>

	<div class="searchbar">
		<input
			type="search"
			bind:value={query}
			placeholder="タイトル / カテゴリで検索（例：防災）"
			aria-label="お知らせを検索"
		/>
		{#if q !== ''}
			<button type="button" onclick={clearQuery} aria-label="検索条件をクリア">×</button>
		{/if}
	</div>

	<p class="count">
		{notices.length} 件中 <strong>{filteredNotices.length}</strong> 件を表示
	</p>

	{#if filteredNotices.length === 0}
		<p class="empty">「{q}」に合うお知らせは見つかりません</p>
	{:else}
		<ul>
			{#each filteredNotices as notice (notice.slug)}
				<li class:selected={notice.slug === selectedSlug}>
					<button type="button" onclick={() => select(notice.slug)}>
						<span class="cat">{notice.category}</span>
						<strong>{notice.title}</strong>
						<span class="excerpt">{notice.excerpt}</span>
						<time>{notice.date}</time>
					</button>
				</li>
			{/each}
		</ul>
	{/if}

	{#if selectedNotice}
		<article>
			<span class="cat">{selectedNotice.category}</span>
			<h3>{selectedNotice.title}</h3>
			<time>{selectedNotice.date}</time>
			<p>{selectedNotice.excerpt}</p>
		</article>
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
	.searchbar {
		position: relative;
		display: flex;
	}
	input[type='search'] {
		width: 100%;
		padding: 0.5rem 0.75rem;
		padding-right: 2.25rem;
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
	.searchbar button {
		position: absolute;
		right: 0.35rem;
		top: 50%;
		transform: translateY(-50%);
		width: 1.5rem;
		height: 1.5rem;
		border: 1px solid currentColor;
		border-radius: 9999px;
		background: transparent;
		color: inherit;
		font: inherit;
		font-size: 0.85rem;
		line-height: 1;
		cursor: pointer;
		opacity: 0.7;
	}
	.searchbar button:hover {
		opacity: 1;
	}
	.count {
		margin: 0;
		font-size: 0.82rem;
		opacity: 0.75;
	}
	.empty {
		margin: 0.4rem 0;
		padding: 1rem;
		text-align: center;
		opacity: 0.7;
		border: 1px dashed currentColor;
		border-radius: 0.375rem;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	li button {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-areas:
			'cat date'
			'title title'
			'excerpt excerpt';
		gap: 0.2rem 0.5rem;
		width: 100%;
		text-align: left;
		padding: 0.6rem 0.75rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		background: transparent;
		color: inherit;
		font: inherit;
		cursor: pointer;
		opacity: 0.95;
	}
	li button:hover {
		opacity: 0.7;
	}
	li.selected button {
		outline: 2px solid currentColor;
		outline-offset: -2px;
		opacity: 1;
	}
	li .cat {
		grid-area: cat;
		font-size: 0.72rem;
		padding: 0.05rem 0.4rem;
		border: 1px solid currentColor;
		border-radius: 9999px;
		justify-self: start;
		opacity: 0.8;
	}
	li time {
		grid-area: date;
		font-size: 0.74rem;
		opacity: 0.7;
		font-feature-settings: 'tnum' 1;
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
	article {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 0.9rem 1rem;
		border: 1px solid currentColor;
		border-radius: 0.5rem;
		margin-top: 0.4rem;
	}
	article .cat {
		font-size: 0.72rem;
		padding: 0.05rem 0.4rem;
		border: 1px solid currentColor;
		border-radius: 9999px;
		align-self: flex-start;
		opacity: 0.8;
	}
	article h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
	}
	article time {
		font-size: 0.78rem;
		opacity: 0.7;
	}
	article p {
		margin: 0;
		line-height: 1.6;
	}
</style>
