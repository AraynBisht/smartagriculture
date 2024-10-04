function sendOTP() {
    const email = document.getElementById('email').value;

    // Call the backend to send OTP
    fetch('/send-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('otp-form').style.display = 'block';
        } else {
            alert('Error sending OTP. Please try again.');
        }
    })
    .catch(error => console.error('Error:', error));
}

function verifyOTP() {
    const email = document.getElementById('email').value;
    const otp = document.getElementById('otp').value;

    // Call the backend to verify OTP
    fetch('/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'index.html';
        } else {
            alert('Invalid OTP. Please try again.');
        }
    })
    .catch(error => console.error('Error:', error));
}
