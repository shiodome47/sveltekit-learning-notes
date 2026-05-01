<script lang="ts">
	type Notice = {
		id: number;
		title: string;
		body: string;
		createdAt: string;
	};

	let notices = $state<Notice[]>([
		{
			id: 1,
			title: '地蔵盆のお知らせ',
			body: '8月23日（土）午後5時から、町内会館前で開催します。',
			createdAt: '2025-08-15'
		},
		{
			id: 2,
			title: '防災訓練のお知らせ',
			body: '9月7日（日）午前9時から、第二公園で集合します。',
			createdAt: '2025-08-25'
		}
	]);

	let title = $state('');
	let body = $state('');
	let error = $state('');
	let nextId = 3;

	function addNotice(e: SubmitEvent) {
		e.preventDefault();
		const t = title.trim();
		const b = body.trim();
		if (t === '' || b === '') {
			error = 'タイトルと本文を入力してください';
			return;
		}
		notices.unshift({
			id: nextId++,
			title: t,
			body: b,
			createdAt: new Date().toISOString().slice(0, 10)
		});
		title = '';
		body = '';
		error = '';
	}

	function removeNotice(id: number) {
		notices = notices.filter((n) => n.id !== id);
	}
</script>

<section class="admin">
	<header>
		<span class="badge">🛡 管理者：Taro</span>
		<h2>お知らせ管理</h2>
	</header>

	<p class="hint">
		これは見た目のサンプルです。<br />
		実際は <code>+page.server.ts</code> の <code>actions</code> がフォーム送信を受けます。
	</p>

	{#if error}
		<p class="error" role="alert">⚠ {error}</p>
	{/if}

	<form class="add-form" onsubmit={addNotice}>
		<input type="text" bind:value={title} placeholder="タイトル" />
		<textarea bind:value={body} placeholder="本文" rows="2"></textarea>
		<button type="submit">追加</button>
	</form>

	{#if notices.length === 0}
		<p class="empty">まだお知らせはありません</p>
	{:else}
		<ul>
			{#each notices as notice (notice.id)}
				<li>
					<article>
						<h3>{notice.title}</h3>
						<time>{notice.createdAt}</time>
						<p>{notice.body}</p>
					</article>
					<button
						type="button"
						aria-label="{notice.title} を削除"
						onclick={() => removeNotice(notice.id)}>×</button
					>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.admin {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		width: 100%;
		max-width: 32rem;
		padding: 1.5rem;
		font-size: 0.9rem;
	}
	header {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.badge {
		align-self: flex-start;
		padding: 0.2rem 0.55rem;
		border-radius: 9999px;
		font-size: 0.78rem;
		border: 1px solid currentColor;
		opacity: 0.85;
	}
	h2 {
		margin: 0;
		font-size: 1.15rem;
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
	.error {
		margin: 0;
		padding: 0.6rem 0.8rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		font-size: 0.85rem;
		font-weight: 500;
	}
	.add-form {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 0.75rem;
		border: 1px dashed currentColor;
		border-radius: 0.5rem;
	}
	.add-form input,
	.add-form textarea {
		padding: 0.45rem 0.65rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		background: transparent;
		color: inherit;
		font: inherit;
		opacity: 0.95;
		resize: vertical;
	}
	.add-form input:focus,
	.add-form textarea:focus {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}
	.add-form button {
		align-self: flex-end;
		padding: 0.45rem 1.1rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		background: transparent;
		color: inherit;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}
	.add-form button:hover {
		opacity: 0.7;
	}
	.empty {
		margin: 0;
		padding: 1rem;
		text-align: center;
		opacity: 0.65;
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
		align-items: flex-start;
		gap: 0.5rem;
		padding: 0.6rem 0.75rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
	}
	li article {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}
	li h3 {
		margin: 0;
		font-size: 0.95rem;
		font-weight: 600;
	}
	li time {
		font-size: 0.72rem;
		opacity: 0.65;
		font-feature-settings: 'tnum' 1;
	}
	li p {
		margin: 0;
		font-size: 0.85rem;
		line-height: 1.55;
		opacity: 0.85;
	}
	li button {
		flex: 0 0 auto;
		padding: 0.2rem 0.6rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		background: transparent;
		color: inherit;
		font: inherit;
		font-size: 1rem;
		line-height: 1;
		cursor: pointer;
		opacity: 0.7;
	}
	li button:hover {
		opacity: 1;
	}
</style>
