const login_form = () => {
    return `
        <section id="login">
        <h1 class="exile-regular">battleship</h1>
        <form action="#">
          <input
            type="text"
            placeholder="Enter Captain's Name"
            class="tagesschrift-regular"
            required
          /><br />
          <button type="submit" class="tagesschrift-regular">
            Comfirm Cap's Name
          </button>
        </form>
      </section>
    `
}