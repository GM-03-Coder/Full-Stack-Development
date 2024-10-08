// Function to calculate BMR and update the gauge
function calculateBMR() {
    // Get input values
    const age = parseInt(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const gender = document.getElementById("gender").value;

    // Validate inputs
    if (isNaN(age) || isNaN(weight) || isNaN(height) || !gender) {
        alert("Please fill in all fields correctly.");
        return;
    }

    let bmr;

    // BMR calculation using the Mifflin-St Jeor Equation
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "female") {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Update the result display
    document.getElementById("bmrResult").textContent = bmr.toFixed(2);

    // Animate the gauge needle
    animateGauge(bmr);
}

// Function to animate the gauge needle based on BMR
function animateGauge(bmr) {
    const needle = document.getElementById("needle");
    
    // Define the BMR range for the gauge
    const minBMR = 1000;
    const maxBMR = 3000;

    // Clamp the BMR within the defined range
    const clampedBMR = Math.max(minBMR, Math.min(bmr, maxBMR));

    // Calculate the rotation angle for the needle
    // 0° corresponds to minBMR, 180° corresponds to maxBMR
    const rotation = ((clampedBMR - minBMR) / (maxBMR - minBMR)) * 180 - 90; // Offset by -90° to start at the left

    // Apply the rotation
    needle.style.transform = `rotate(${rotation}deg)`;
}
