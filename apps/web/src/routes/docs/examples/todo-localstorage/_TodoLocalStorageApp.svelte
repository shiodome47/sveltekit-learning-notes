<script lang="ts">
	type Todo = {
		id: number;
		text: string;
		done: boolean;
	};

	const STORAGE_KEY = 'svelte-notes-todos-v1';

	function loadInitial(): Todo[] {
		if (typeof window === 'undefined') return [];
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			return raw ? (JSON.parse(raw) as Todo[]) : [];
		} catch {
			return [];
		}
	}

	let todos = $state<Todo[]>(loadInitial());
	let newTodo = $state('');

	const remaining = $derived(todos.filter((t) => !t.done).length);

	$effect(() => {
		if (typeof window === 'undefined') return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	});

	function addTodo() {
		const text = newTodo.trim();
		if (text === '') return;
		todos.push({ id: Date.now(), text, done: false });
		newTodo = '';
	}

	function clearDone() {
		todos = todos.filter((t) => !t.done);
	}

	function clearAll() {
		todos = [];
	}
</script>

<section class="todo">
	<h2>やることリスト（保存される版）</h2>
	<p class="hint">
		リロードしても消えません。保存先は <code>localStorage('{STORAGE_KEY}')</code>。
	</p>

	<form
		onsubmit={(e) => {
			e.preventDefault();
			addTodo();
		}}
	>
		<input type="text" bind:value={newTodo} placeholder="やることを書く" />
		<button type="submit">追加</button>
	</form>

	{#if todos.length === 0}
		<p class="empty">やることはまだありません 🎉</p>
	{:else}
		<ul>
			{#each todos as todo (todo.id)}
				<li class:done={todo.done}>
					<label>
						<input type="checkbox" bind:checked={todo.done} />
						<span>{todo.text}</span>
					</label>
				</li>
			{/each}
		</ul>

		<footer>
			<span>残り <strong>{remaining}</strong> 件</span>
			<div class="actions">
				<button type="button" onclick={clearDone}>完了済みを削除</button>
				<button type="button" onclick={clearAll}>ぜんぶ消す</button>
			</div>
		</footer>
	{/if}
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
		padding: 0.5rem 0.75rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		opacity: 0.95;
	}
	li.done {
		opacity: 0.45;
	}
	li.done span {
		text-decoration: line-through;
	}
	li label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}
	.empty {
		margin: 0;
		padding: 1rem;
		text-align: center;
		opacity: 0.7;
	}
	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
		opacity: 0.85;
		flex-wrap: wrap;
	}
	.actions {
		display: flex;
		gap: 0.5rem;
	}
	.actions button {
		padding: 0.35rem 0.7rem;
		font-size: 0.78rem;
	}
</style>
