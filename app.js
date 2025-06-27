// check which page we are on 

const page = window.location.pathname.split('/').pop();

// login
if (page === 'index.html' || page === ''){

    const loginForm = document.getElementById('loginForm')
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', (e) => {

        e.preventDefault();
        
        // get input value
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // get users from localstorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(u => u.email === email && u.password === password);

        if(user) {
            // login
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'profile.html';
        } else {
            //faild
            errorMessage.textContent = 'Invalid email or password';
            errorMessage.classList.remove('hidden');

            // Hide error after 3 seconds
            setTimeout(() => {
                errorMessage.classList.add('hidden');
            }, 3000);
        }
    })
}

// Register
if(page === 'register.html'){
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

     registerForm.addEventListener('submit', (e) => {

        e.preventDefault();

        // Get input values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Reset messages
        errorMessage.classList.add('hidden');
        successMessage.classList.add('hidden');

        // Validate passwords match
        if (password !== confirmPassword) {
            errorMessage.textContent = 'Passwords do not match';
            errorMessage.classList.remove('hidden');
            return;
        }
        // Get existing users
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if email already exists
        if (users.find(u => u.email === email)) {
            errorMessage.textContent = 'Email already registered';
            errorMessage.classList.remove('hidden');
            return;
        }
        // Create new user
        const newUser = {
            name,
            email,
            password,
            registeredAt: new Date().toISOString()
        };
        
        // Add to users array
        users.push(newUser);
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Show success message
        successMessage.textContent = 'Registration successful! Redirecting to login...';
        successMessage.classList.remove('hidden');

        // Clear form
        registerForm.reset();
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });

}

// Profile 
if (page === 'profile.html') {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // If no user is logged in, redirect to login
    if (!currentUser) {
        window.location.href = 'index.html';
    } else {
        // Display
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('displayName').textContent = currentUser.name;
        document.getElementById('displayEmail').textContent = currentUser.email;
        
        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        
        logoutBtn.addEventListener('click', () => {
            // Remove current user from localStorage
            localStorage.removeItem('currentUser');
            
            // Redirect to login page
            window.location.href = 'index.html';
        });
    }
}