import { writable } from "svelte/store"

export let user = writable(null);

export let suggestions = writable([
    {
        "name": "John",
        "suggestion": "I really love Berlin"
    },
    {
        "name": "Bob",
        "suggestion": "I never want to go to Texas. Im afraid ill get shot! "
    }

]);