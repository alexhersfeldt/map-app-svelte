import { writable } from 'svelte-local-storage-store'

export let user = writable('user', null);
