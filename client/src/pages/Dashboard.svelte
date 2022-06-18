<script>
    import { user } from "../data/stores"
    import{ push } from "svelte-spa-router";
    import Map from "../components/map.svelte";
    import axios from "axios";
    import toastr from "toastr"

    let userValue;
    function redirect(url) {
        push(url)
    }
    user.subscribe(value => {
		userValue = value;
	});

    async function logout() {
    try {
      const { data } = await axios.post("http://localhost:3000/api/logout", {
      });
      
      $user = null
      toastr.success("Logged out")
      push("/");
    
    } catch (error) {
      console.log(error)
    }
  }
</script>
    <!--
    {#if !userValue}
        <h1>Not logged in</h1>
        <button class="button is-info is-light" on:click={() => redirect("/login")}>Login</button>

    {:else}
        <h1 class="subtitle is-3">Welcome {userValue.email}</h1>
        <Map/>
        <div class="logout-button">
            <button class="button is-info is-light" on:click= {logout}>Logout</button>
        </div>
        
     {/if}
    -->
    <div class="wrapper">
        <h1 class="subtitle is-3"> Welcome Alex</h1>
        <h1 class="subtitle is-4">Create a map with your dream destinations, or places you would only end up in a nightmare</h1>
        <button class="button is-info is-light" on:click= {logout}>Logout</button>
    </div>
    
        <Map/>
        <br>
        <div class="logout-button">
            
        </div>
        

        
    
    
    
    <style>
      .wrapper {
        display: flex;
        justify-content: space-evenly;
        align-items: baseline;
      }
    </style>