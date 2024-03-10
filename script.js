function loadScenario(scenarioName) {
  fetch(scenarioName)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Create video element and potentially other elements
      const video = document.createElement("iframe");
      video.src = data[0].videoUrl; // Add autoplay to the video URL
      video.setAttribute("allow", "autoplay"); // Allow autoplay
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
        throw new Error("Scenarios didn't load properly");
      }
    })
    .catch((error) => {
      console.log(error);
    });
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

    // Create anchor tag
    const anchor = document.createElement("a");
    // Set href attribute to navigate to different HTML files
    // Replace 'path/to/your/html/file' with the actual paths to your HTML files
    anchor.href = index === 0 ? "index.html" : "option2.html";
    anchor.appendChild(radio);
    anchor.appendChild(document.createTextNode(choice.label));

    label.appendChild(anchor);
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