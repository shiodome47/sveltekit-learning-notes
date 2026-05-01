<script lang="ts">
	type Todo = { id: number; description: string };

	const sample: Todo[] = [
		{ id: 1, description: 'お知らせを書く' },
		{ id: 2, description: '会議資料を準備する' }
	];

	function preventSubmit(e: SubmitEvent) {
		e.preventDefault();
	}
</script>

<section class="todo">
	<h2>やることリスト（サーバー保存版・見た目）</h2>
	<p class="hint">
		これはレイアウトのサンプルです。<br />
		実際の追加・削除は <code>+page.server.ts</code> の <code>actions</code> が処理します。
	</p>

	<form method="POST" action="?/create" onsubmit={preventSubmit}>
		<input type="text" name="description" placeholder="やることを書く" />
		<button type="submit">追加</button>
	</form>

	<ul>
		{#each sample as todo (todo.id)}
			<li>
				<span>{todo.description}</span>
				<form method="POST" action="?/delete" onsubmit={preventSubmit}>
					<input type="hidden" name="id" value={todo.id} />
					<button type="submit" aria-label="{todo.description} を削除">×</button>
				</form>
			</li>
		{/each}
	</ul>
</section>

<style>
	.todo {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
		max-width: 26rem;
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
	form {
		display: flex;
		gap: 0.5rem;
	}
	input[type='text'] {
		flex: 1;
		min-width: 0;
		padding: 0.5rem 0.75rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		background: transparent;
		color: inherit;
		font: inherit;
		opacity: 0.95;
	}
	input[type='text']:focus {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}
	button {
		padding: 0.5rem 1rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		background: transparent;
		color: inherit;
		font: inherit;
		cursor: pointer;
	}
	button:hover {
		opacity: 0.7;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.4rem 0.6rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		opacity: 0.95;
	}
	li form {
		flex: 0 0 auto;
	}
	li form button {
		padding: 0.2rem 0.6rem;
		font-size: 0.95rem;
		line-height: 1;
	}
</style>
