<script>
import Router from "svelte-spa-router"	
import Home from "./pages/Home.svelte";
import Login from "./pages/Login.svelte";
import Signup from "./pages/Signup.svelte";
import Dashboard from "./pages/Dashboard.svelte";

const routes = {
	"/" : Home,
	"/dashboard" : Dashboard ,
	"/login" : Login,
	"/signup" : Signup,
};

</script>

<main>
	<Router {routes} />
</main>

<style>

</style>