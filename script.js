async function loadScenario(scenarioName) {
  try {
    await fetch(scenarioName)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Create video element and potentially other elements
        const video = document.createElement("iframe");
        video.src = data[0].videoUrl;
        video.controls = false; // Hide video controls

        // Clear existing video element (if any)
        const existingVideo = document
          .getElementById("video-container")
          .querySelector("iframe");
        if (existingVideo) {
          existingVideo.parentNode.removeChild(existingVideo);
        }

        // Append video and potentially other elements to the container
        document.getElementById("video-container").appendChild(video);

        // Check for form display
        if (data[0].form.displayForm) {
          displayForm(data[0].form.choices);
        } else {
          // Handle scenarios without forms (e.g., end game)
          // alert("End of scenario!");
          throw new Error("Scenarios didn't load properly")
        }
      })
  } catch (error) {
    console.log(error);
  }
}

function displayForm(choices) {
  const formContainer = document.getElementById("form-container");

  // Clear existing form (if any)
  formContainer.innerHTML = "";

  // Create new form
  const form = document.createElement("form");

  // Add choices as radio buttons
  choices.forEach((choice, index) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "choice";
    radio.value = index;
    label.appendChild(radio);
    label.appendChild(document.createTextNode(choice.label));
    form.appendChild(label);
    form.appendChild(document.createElement("br")); // line break
  });

  // Add submit button
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "Submit";
  form.appendChild(submit);

  // Append form to container
  formContainer.appendChild(form);
}

loadScenario("/scenario1.json");

// function loadScenario(scenarioName) {
//   fetch(`scenarios/${scenarioName}.json`)
//     .then(response => response.json())
//     .then(data => {
//       // Update scenario text
//       document.getElementById("scenario-text").textContent = data.mainText;

//       // Create video element and potentially other elements
//       const video = document.createElement("video");
//       video.src = data.mainVideo;
//       video.controls = false; // Hide video controls

//       // ... (add other elements as needed)

//       // Clear existing video element (if any)
//       const existingVideo = document.getElementById("game-container").querySelector("video");
//       if (existingVideo) {
//         existingVideo.parentNode.removeChild(existingVideo);
//       }

//       // Append video and potentially other elements to the container
//       document.getElementById("game-container").appendChild(video);
//       // ... (append other elements)

//       // Check for form display
//       if (data.displayForm === "Yes") {
//         displayForm(data.choices);
//       } else {
//         // Handle scenarios without forms (e.g., end game)
//         alert("End of scenario!");
//       }
//     })
//     .catch(error => {
//       console.error("Error loading scenario:", error);
//       alert("Failed to load scenario data!");
//     });
// }
