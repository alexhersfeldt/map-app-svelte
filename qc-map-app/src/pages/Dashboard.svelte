<script>
    import { user } from "../data/stores"
    import Logout from "../components/Logout.svelte"
    import{ push } from "svelte-spa-router";
    import Map from "../components/map.svelte";
    let userValue;
    function redirect(url) {
        push(url)
    }
    user.subscribe(value => {
		userValue = value;
	});
    </script>

    {#if !userValue}
        <h1>Not logged in</h1>
        <button class="button is-info is-light" on:click={() => redirect("/login")}>Login</button>

    {:else}
        <h1 class="title is-1">Welcome {userValue.email}</h1>
        <Map/>
        <Logout/>
        <button class="button is-info is-light" on:click={() => redirect("/contact")}>Contact Us</button>
        
     {/if}


        
    
    
    
    <style>
            
    </style>