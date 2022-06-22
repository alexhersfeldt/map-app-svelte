<script>
    import { user, suggestions as Suggestions } from "../data/stores";
    import toastr from "toastr"


    let suggestion;
    let userValue;
    user.subscribe(value => {
		userValue = value;
    });
     
    

    function addSuggestion(name, suggestion) {
        let newSuggestion = {
            name: name,
            suggestion: suggestion
        };
        Suggestions.push(newSuggestion);
        toastr.success("New suggestion added, Thank you " + name)
    }


</script>

<main>
    <div>
        {#each Suggestions as suggestion}
        <label for ="comment">Suggestion add by ${suggestion.name}</label>
        <span name ="comment" class="tag is-light">${suggestion.text}</span>
        {/each}   
        <form>
            <textarea class="textarea is-info" placeholder="Info textarea" bind:value={suggestion} ></textarea>
            <button class="button is-info is-light" on:click={() => addSuggestion(userValue.value, suggestion )} >Add Suggestion </button>
        </form>
        

    </div>

</main>

<style>
label,textarea{
  display:flex;
  flex-direction:column;
}

</style>