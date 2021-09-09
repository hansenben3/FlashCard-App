import React from "react";

function CreateDeck() {
  return (
      <div className="container text-black">
        <h2 className="display-4">Create Deck</h2>
        <form>
          <h4>
            Name
          </h4>
          <br>
          </br>
          <input type="text" name="name" />
          <br>
          </br>
          <h4>
            Description
          </h4>
          <br>
          </br>
          <textarea type="text" name="description" />
        </form>
        <br>
        </br>
        <div>
        <button >
            Cancel
          </button>
          <button type="submit">
            Submit
          </button>
        </div>
      </div>
  );
}

export default CreateDeck;