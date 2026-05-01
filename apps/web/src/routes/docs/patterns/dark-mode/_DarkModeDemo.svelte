<script lang="ts">
	type Theme = 'light' | 'dark';

	const STORAGE_KEY = 'svelte-notes-darkmode-demo-v1';

	function loadInitial(): Theme {
		if (typeof window === 'undefined') return 'light';
		const saved = localStorage.getItem(STORAGE_KEY);
		return saved === 'dark' ? 'dark' : 'light';
	}

	let theme = $state<Theme>(loadInitial());

	$effect(() => {
		if (typeof window === 'undefined') return;
		localStorage.setItem(STORAGE_KEY, theme);
	});

	function toggle() {
		theme = theme === 'light' ? 'dark' : 'light';
	}
</script>

<section class="demo" class:dark={theme === 'dark'}>
	<header>
		<span class="badge">{theme === 'dark' ? '🌙 ダーク' : '☀️ ライト'}</span>
		<button type="button" onclick={toggle}>
			{theme === 'dark' ? 'ライトに切り替え' : 'ダークに切り替え'}
		</button>
	</header>

	<article>
		<h3>ようこそ！</h3>
		<p>これは <strong>localStorage</strong> にテーマを保存する小さなデモです。</p>
		<p>ボタンで色を切り替えると、ブラウザを閉じても次に開いたときに同じテーマで表示されます。</p>
	</article>

	<footer>
		<small>保存先：<code>localStorage('{STORAGE_KEY}')</code></small>
	</footer>
</section>

<style>
	.demo {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		width: 100%;
		max-width: 28rem;
		padding: 1.25rem 1.5rem;
		border: 1px solid #d4d4d4;
		border-radius: 0.75rem;
		background: #fafafa;
		color: #222;
		font-size: 0.9rem;
		transition:
			background-color 220ms,
			color 220ms,
			border-color 220ms;
	}
	.demo.dark {
		background: #1c1c1c;
		color: #f5f5f5;
		border-color: #3a3a3a;
	}
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.6rem;
	}
	.badge {
		padding: 0.2rem 0.55rem;
		border-radius: 9999px;
		font-size: 0.78rem;
		border: 1px solid currentColor;
		opacity: 0.85;
	}
	button {
		padding: 0.5rem 0.9rem;
		border-radius: 0.4rem;
		border: 1px solid currentColor;
		background: transparent;
		color: inherit;
		font: inherit;
		cursor: pointer;
	}
	button:hover {
		opacity: 0.7;
	}
	article {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
	}
	p {
		margin: 0;
		line-height: 1.6;
		opacity: 0.9;
	}
	footer small {
		font-size: 0.75rem;
		opacity: 0.7;
	}
	footer code {
		padding: 0.1rem 0.35rem;
		border-radius: 0.25rem;
		border: 1px solid currentColor;
		font-size: 0.72rem;
		opacity: 0.85;
	}
</style>
