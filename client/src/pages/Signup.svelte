<script>
    import axios from "axios";
    import{ push } from "svelte-spa-router";
    import toastr from "toastr"
    
    let email;
    let password;
    
    async function signup() {
      try {
        const { data } = await axios.post("http://localhost:3000/api/signup", {
          email,
          password,
        });
        toastr.success('Email registered, Now Login')
        push("/login");
      } catch (error) {
        console.log(error.response.data.message)
        if (error.response.data.message === "UserExistsError") {
        email = "";
        password = "";
        toastr.warning('Email Already in use')
      }
    }
    }
    
    
    
    </script>
    
    <main >
      
      <p class="title is-1 is-info">Welcome to The Map App</p>
      <p class="title is-3 is-info">Please sign up to get started</p>
      
      <div id="container">
        <form class="box" on:submit|preventDefault={signup}>
        
                
          <div class="field" >
            <label for="" class="label">Name</label>
            <div class="control">
              <input class="input" type="text" bind:value={email} required placeholder="e.g. Alex">
            </div>
          </div>
    
          <div class="field">
            <label for="" class="label">Password</label>
            <div class="control">
              <input class="input" type="password" bind:value={password} placeholder="****" required>
            </div>
          </div>
    
    
          <div class="field">
              <div class="control">
                <input type="submit" class="button is-info is-light" value="Submit" />
              </div>
          </div>
    
        </form>
      </div>
    </main>
    
    <style>
    #container {
      display: flex;
      justify-content: center;
    }
    
    form.box {
        width: 400px;
        margin: 10px;
    
    }
    
    div.field {
        width: 300px;
        margin: auto;
        padding-bottom: 10px;
    
    }
    label, p {
        display: flex;
        justify-content: center;
       
    }
    
    </style>