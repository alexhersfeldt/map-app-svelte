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

  // moved logout function here because of bug
  async function logout() {
  try {
    const { data } = await axios.post("http://localhost:3000/api/logout", {
    });
    
    user.set(null)
    toastr.success("Logged out")
    push("/");
  
  } catch (error) {
    console.log(error)
  }
  }
</script>
<main>
    
  {#if !userValue}
      <h1>Not logged in</h1>
      <button class="button is-info is-light" on:click={() => redirect("/login")}>Login</button>

  {:else}
    <div class="wrapper">
      <h1 class="subtitle is-3"> Welcome {userValue.email}</h1>
      <span class="tag is-light is-large"> Create a map with your dream destinations, or places you would only end up in a nightmare:</span>
      <button class="button is-info is-light" on:click= {logout}>Logout</button>
    </div>

    <Map/>
    
  {/if}

</main>
    
<style>
  .wrapper {
    display: flex;
    justify-content: space-evenly;
    align-items: baseline;
  }
</style>