function sendMessage() {
    // Initialize emailjs
    emailjs.init("19YZt0cTuvdX5zQfh");

    // Validation function
    function validateForm() {
        let isValid = true;

        // List of input fields and their corresponding error messages
        const fields = [
            { id: 'fname', errorId: 'fname-error' },
            { id: 'lname', errorId: 'lname-error' },
            { id: 'email', errorId: 'email-error' },
            { id: 'destination', errorId: 'destination-error' },
            { id: 'date', errorId: 'date-error' },
            { id: 'num_people', errorId: 'num_people-error' },
            { id: 'dropdown', errorId: 'dropdown-error' },
            { id: 'remarks', errorId: 'remarks-error' }
        ];

        fields.forEach(field => {
            const input = document.querySelector(`#${field.id}`);
            const errorSpan = document.querySelector(`#${field.errorId}`);
            if (input.value.trim() === '' || (input.id === 'dropdown' && input.value === '')) {
                isValid = false;
                errorSpan.style.display = "inline"; // Show error message
                input.classList.add('error'); // Add error class
            } else {
                errorSpan.style.display = "none"; // Hide error message
                input.classList.remove('error'); // Remove error class
            }
        });

        return isValid;
    }

    if (!validateForm()) {
        // Stop if form is invalid
        console.log('Form is invalid. Please check all required fields.');
        return false; // Prevent form submission
    }

    var serviceID = "service_p8kl3ki";
    var templateID = "template_a9xfkk5";

    var params = {
        sendername: document.querySelector("#fname").value,
        senderlname: document.querySelector("#lname").value,
        senderemail: document.querySelector("#email").value,
        destination: document.querySelector("#destination").value,
        date: document.querySelector("#date").value,
        numpeople: document.querySelector("#num_people").value,
        dropdown: document.querySelector("#dropdown").value,
        remarks: document.querySelector("#remarks").value
    };

    emailjs.send(serviceID, templateID, params)
    .then(res => {
        Swal.fire({
            position: "center",
            icon: "success",
            text: `Thank you, '${params['sendername']}'! Your message has been sent.`,
            showConfirmButton: false,
            timer: 1500
        });

        // Clear form fields
        document.querySelector("#fname").value = '';
        document.querySelector("#lname").value = '';
        document.querySelector("#email").value = '';
        document.querySelector("#destination").value = '';
        document.querySelector("#date").value = '';
        document.querySelector("#num_people").value = '';
        document.querySelector("#dropdown").value = '';
        document.querySelector("#remarks").value = '';

    })
    .catch(error => {
        console.error('Error:', error); // Log the error for debugging
        alert('Sorry, something went wrong. Please try again later.');
    });

    return false; // Prevent default form submission
}