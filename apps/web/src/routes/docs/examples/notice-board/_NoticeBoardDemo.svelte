<script lang="ts">
	type Notice = {
		slug: string;
		title: string;
		date: string;
		excerpt: string;
		body: string;
	};

	const notices: Notice[] = [
		{
			slug: 'jizobon',
			title: '地蔵盆のお知らせ',
			date: '2025-08-23',
			excerpt: '今年も町内の地蔵盆を開催します。',
			body: '日時：8月23日（土）午後5時から。場所：町内会館前。お子さま向けにお菓子もご用意しています。'
		},
		{
			slug: 'bousai-training',
			title: '防災訓練のお知らせ',
			date: '2025-09-07',
			excerpt: '町内合同の防災訓練を行います。',
			body: '日時：9月7日（日）午前9時から。集合場所：第二公園。雨天時は10/14（日）に延期します。'
		},
		{
			slug: 'yakuinkai',
			title: '役員会のお知らせ',
			date: '2025-10-05',
			excerpt: '次年度の役員会を開きます。',
			body: '日時：10月5日（日）午後2時から。場所：町内会館。各班から1名のご参加をお願いします。'
		}
	];

	let selectedSlug = $state<string | null>(null);

	const selectedNotice = $derived(
		selectedSlug ? (notices.find((n) => n.slug === selectedSlug) ?? null) : null
	);

	function select(slug: string) {
		selectedSlug = slug === selectedSlug ? null : slug;
	}
</script>

<section class="board">
	<h2>町内のお知らせ</h2>
	<p class="hint">タップすると、下に詳細が出ます。本物では <code>/notices/[slug]</code> で別URLになります。</p>

	{#if notices.length === 0}
		<p class="empty">まだお知らせはありません</p>
	{:else}
		<ul>
			{#each notices as notice (notice.slug)}
				<li class:selected={notice.slug === selectedSlug}>
					<button type="button" onclick={() => select(notice.slug)}>
						<time>{notice.date}</time>
						<strong>{notice.title}</strong>
						<span class="excerpt">{notice.excerpt}</span>
					</button>
				</li>
			{/each}
		</ul>
	{/if}

	{#if selectedNotice}
		<article>
			<h3>{selectedNotice.title}</h3>
			<time>{selectedNotice.date}</time>
			<p>{selectedNotice.body}</p>
		</article>
	{:else if notices.length > 0}
		<p class="prompt">↑ 上のお知らせをタップすると詳細が表示されます</p>
	{/if}
</section>

<style>
	.board {
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
		padding: 0.1rem 0.3rem;
		border-radius: 0.25rem;
		border: 1px solid currentColor;
		opacity: 0.85;
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
		grid-template-columns: auto 1fr;
		grid-template-rows: auto auto;
		gap: 0.1rem 0.6rem;
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
	li time {
		grid-row: 1 / 3;
		font-size: 0.78rem;
		font-feature-settings: 'tnum' 1;
		opacity: 0.7;
		align-self: center;
	}
	li strong {
		grid-column: 2;
		font-weight: 600;
	}
	li .excerpt {
		grid-column: 2;
		font-size: 0.82rem;
		opacity: 0.7;
	}
	article {
		margin-top: 0.5rem;
		padding: 0.9rem 1rem;
		border: 1px solid currentColor;
		border-radius: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
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
	.prompt {
		margin: 0;
		text-align: center;
		font-size: 0.82rem;
		opacity: 0.6;
	}
	.empty {
		margin: 0;
		padding: 1rem;
		text-align: center;
		opacity: 0.7;
	}
</style>
