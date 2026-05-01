<script lang="ts">
	type User = {
		username: string;
		role: 'admin' | 'member';
	};

	type LoginState =
		| { kind: 'idle'; error?: string }
		| { kind: 'loading' }
		| { kind: 'logged-in'; user: User };

	// デモ用の仮アカウント（本番では絶対NG・DBで照合する）
	const validCreds: { username: string; password: string; role: 'admin' | 'member' }[] = [
		{ username: 'admin', password: 'password', role: 'admin' },
		{ username: 'taro', password: 'pass1234', role: 'member' }
	];

	let state = $state<LoginState>({ kind: 'idle' });
	let username = $state('');
	let password = $state('');

	async function login(e: SubmitEvent) {
		e.preventDefault();
		state = { kind: 'loading' };

		// 通信遅延の再現
		await new Promise((r) => setTimeout(r, 400));

		const found = validCreds.find(
			(c) => c.username === username && c.password === password
		);

		if (!found) {
			state = { kind: 'idle', error: 'ユーザー名かパスワードが違います' };
			password = '';
			return;
		}

		state = {
			kind: 'logged-in',
			user: { username: found.username, role: found.role }
		};
		password = '';
	}

	function logout() {
		state = { kind: 'idle' };
		username = '';
		password = '';
	}
</script>

<section class="login">
	<h2>ログインフォーム（デモ）</h2>
	<p class="hint">
		試すアカウント：<br />
		<code>admin / password</code>（管理者）<br />
		<code>taro / pass1234</code>（一般会員）
	</p>

	{#if state.kind === 'logged-in'}
		<div class="success">
			<p class="badge">✓ ログインしました</p>
			<dl>
				<dt>ユーザー</dt>
				<dd><strong>{state.user.username}</strong></dd>
				<dt>権限</dt>
				<dd>
					<span class="role" class:admin={state.user.role === 'admin'}>
						{state.user.role}
					</span>
				</dd>
			</dl>
			<p class="next">
				{#if state.user.role === 'admin'}
					管理画面（<code>/admin/notices</code>）へ移動できます。
				{:else}
					会員ページへ移動できます。
				{/if}
			</p>
			<button type="button" class="logout" onclick={logout}>ログアウト</button>
		</div>
	{:else}
		{#if state.kind === 'idle' && state.error}
			<p class="error" role="alert">⚠ {state.error}</p>
		{/if}

		<form onsubmit={login}>
			<label>
				<span class="label">ユーザー名</span>
				<input
					type="text"
					bind:value={username}
					autocomplete="username"
					required
					disabled={state.kind === 'loading'}
				/>
			</label>

			<label>
				<span class="label">パスワード</span>
				<input
					type="password"
					bind:value={password}
					autocomplete="current-password"
					required
					disabled={state.kind === 'loading'}
				/>
			</label>

			<button type="submit" disabled={state.kind === 'loading'}>
				{state.kind === 'loading' ? 'ログイン中…' : 'ログイン'}
			</button>
		</form>
	{/if}
</section>

<style>
	.login {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
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
		line-height: 1.6;
	}
	.hint code {
		font-size: 0.78rem;
		padding: 0.05rem 0.35rem;
		border-radius: 0.25rem;
		border: 1px solid currentColor;
		opacity: 0.85;
	}
	.error {
		margin: 0;
		padding: 0.6rem 0.8rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		font-weight: 500;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		padding: 0.75rem;
		border: 1px dashed currentColor;
		border-radius: 0.5rem;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
	.label {
		font-size: 0.78rem;
		opacity: 0.75;
	}
	input {
		padding: 0.5rem 0.75rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		background: transparent;
		color: inherit;
		font: inherit;
		opacity: 0.95;
	}
	input:focus {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}
	input:disabled {
		opacity: 0.5;
	}
	form button[type='submit'] {
		align-self: flex-end;
		padding: 0.5rem 1.2rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		background: transparent;
		color: inherit;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}
	form button[type='submit']:hover:not(:disabled) {
		opacity: 0.7;
	}
	form button[type='submit']:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.success {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		padding: 1rem;
		border: 1px solid currentColor;
		border-radius: 0.5rem;
	}
	.badge {
		margin: 0;
		font-weight: 600;
		font-size: 0.92rem;
	}
	dl {
		margin: 0;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.3rem 0.8rem;
		font-size: 0.85rem;
	}
	dt {
		opacity: 0.65;
	}
	dd {
		margin: 0;
	}
	.role {
		padding: 0.05rem 0.5rem;
		border-radius: 9999px;
		border: 1px solid currentColor;
		font-size: 0.72rem;
		opacity: 0.8;
	}
	.role.admin {
		opacity: 1;
		font-weight: 600;
	}
	.next {
		margin: 0;
		font-size: 0.82rem;
		opacity: 0.85;
	}
	.next code {
		font-size: 0.78rem;
		padding: 0.05rem 0.3rem;
		border-radius: 0.25rem;
		border: 1px solid currentColor;
		opacity: 0.85;
	}
	.logout {
		align-self: flex-start;
		padding: 0.4rem 1rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		background: transparent;
		color: inherit;
		font: inherit;
		cursor: pointer;
		opacity: 0.85;
	}
	.logout:hover {
		opacity: 1;
	}
</style>
