let createButton = document.getElementById('create-button')

function requiredField(input) {
    if (input.value.length < 1) {
        //red border
        input.style.borderColor = "#e74c3c";
    } else {
        input.style.borderColor = '#8FC1E3'
    }
    evaluateFormReadiness()
}

function evaluateFormReadiness() {
    if (!document.getElementById('title').value) {
        createButton.disabled = true;
    } else if (!document.getElementById('birthDate').value) {
        createButton.disabled = true;
    } else if (!document.getElementById('passingDate').value) {
        createButton.disabled = true;
    } else if (!document.getElementById('photo').value) {
        createButton.disabled = true;
    } else if (!document.getElementById('body').value) {
        createButton.disabled = true;
    } else {
        //other checks
        document.getElementById('create-button').disabled = false;
    }
}

