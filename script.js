  // Create a new Map to store names and their weights
  const nameMap = new Map();

  // Function to add a name to the nameMap
  function addName() {
      // Get the value from the input field, trim whitespace, and convert to lowercase
      const nameInput = document.getElementById('nameInput').value.trim().toLowerCase();
      // If the input is not empty, add or update the name in the nameMap
      if (nameInput) {
          nameMap.set(nameInput, (nameMap.get(nameInput) || 0) + 1);
          // Display the updated list of names
          displayNames();
          // Clear the input field
          document.getElementById('nameInput').value = '';
      }
  }

  // Function to display the names and their weights
  function displayNames() {
      // Get the name list container element
      const nameList = document.getElementById('nameList');
      // Clear the current content of the name list
      nameList.innerHTML = '';
      // Iterate over the nameMap and create HTML for each name and its weight
      nameMap.forEach((weight, name) => {
          // Determine the CSS class for the weight based on its value
          const weightClass = weight < 3 ? 'low-weight' : weight < 5 ? 'medium-weight' : 'high-weight';
          // Append the name and weight to the name list
          nameList.innerHTML += `
              <div class="name-item">
                  ${name}<span class="weight ${weightClass}"> (${weight})</span>
                  <div>
                      <button class="edit-button" onclick="editName('${name}')">Edit</button>
                      <button class="remove-button" onclick="removeName('${name}')">Remove</button>
                  </div>
              </div>`;
      });
      // Show the name list only if there are names
      nameList.style.display = nameMap.size > 0 ? 'block' : 'none';
  }

  // Function to edit a name in the nameMap
  function editName(name) {
      // Prompt the user to enter a new name
      const newName = prompt("Edit name:", name);
      // If the new name is not empty, update the name in the nameMap
      if (newName && newName.trim() !== "") {
          // Convert the new name to lowercase and trim whitespace
          const lowerNewName = newName.trim().toLowerCase();
          // Get the weight of the old name
          const weight = nameMap.get(name);
          // Remove the old name from the nameMap
          nameMap.delete(name);
          // Add or update the new name in the nameMap with the old weight
          nameMap.set(lowerNewName, (nameMap.get(lowerNewName) || 0) + weight);
          // Display the updated list of names
          displayNames();
      }
  }

  // Function to remove a name from the nameMap
  function removeName(name) {
      // Delete the name from the nameMap
      nameMap.delete(name);
      // Display the updated list of names
      displayNames();
  }

  // Function to pick a winner based on the weights of the names
  function pickWinner() {
      // Calculate the total weight of all names
      let totalWeight = 0;
      nameMap.forEach(weight => totalWeight += weight);
      // Generate a random number between 0 and the total weight
      let random = Math.random() * totalWeight;
      // Iterate over the nameMap and select a winner based on the random number
      for (let [name, weight] of nameMap) {
          random -= weight;
          if (random <= 0) {
              // Display the winner
              document.getElementById('winner').innerText = `Winner: ${name}`;
              return;
          }
      }
  }