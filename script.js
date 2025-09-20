// Global state
let currentUser = null;
let currentOnboardingStep = 1;
let selectedPlan = null;

// Modal functions
function openSignUpModal() {
    document.getElementById('signUpModal').style.display = 'block';
}

function closeSignUpModal() {
    document.getElementById('signUpModal').style.display = 'none';
}

function openOnboardingModal() {
    document.getElementById('onboardingModal').style.display = 'block';
    currentOnboardingStep = 1;
    showOnboardingStep(1);
}

function closeOnboardingModal() {
    document.getElementById('onboardingModal').style.display = 'none';
}

function openDashboard() {
    document.getElementById('dashboardModal').style.display = 'block';
}

function closeDashboard() {
    document.getElementById('dashboardModal').style.display = 'none';
}

function openWithdrawalModal() {
    document.getElementById('withdrawalModal').style.display = 'block';
    closeDashboard();
}

function closeWithdrawalModal() {
    document.getElementById('withdrawalModal').style.display = 'none';
}

// Onboarding functions
function showOnboardingStep(step) {
    // Hide all steps
    const steps = document.querySelectorAll('.onboarding-step');
    steps.forEach(step => step.classList.remove('active'));
    
    // Show current step
    document.getElementById(`onboardingStep${step}`).classList.add('active');
    currentOnboardingStep = step;
}

function nextOnboardingStep() {
    if (currentOnboardingStep < 4) {
        showOnboardingStep(currentOnboardingStep + 1);
    }
}

function selectPlan(plan) {
    selectedPlan = plan;
    
    // Remove selected class from all cards
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to clicked card
    event.target.closest('.plan-card').classList.add('selected');
    
    // Move to next step after a short delay
    setTimeout(() => {
        nextOnboardingStep();
    }, 500);
}

function linkBankAccount() {
    // Simulate bank linking process
    alert('Bank linking would be integrated with UPI/Plutus APIs in a real implementation');
    
    // Move to next step
    setTimeout(() => {
        nextOnboardingStep();
    }, 1000);
}

function goToDashboard() {
    closeOnboardingModal();
    openDashboard();
}

// Withdrawal functions
function calculateWithdrawalFee() {
    const amount = parseFloat(document.getElementById('withdrawalAmount').value) || 0;
    const feeRate = 0.03; // 3% fee
    const fee = amount * feeRate;
    const totalReceived = amount - fee;
    
    document.getElementById('withdrawalAmountDisplay').textContent = `₹${amount.toFixed(2)}`;
    document.getElementById('processingFeeDisplay').textContent = `₹${fee.toFixed(2)}`;
    document.getElementById('totalReceivedDisplay').textContent = `₹${totalReceived.toFixed(2)}`;
    
    // Enable/disable confirm button
    const confirmBtn = document.getElementById('confirmWithdrawal');
    if (amount > 0 && amount <= 2150.75) {
        confirmBtn.disabled = false;
    } else {
        confirmBtn.disabled = true;
    }
}

function confirmWithdrawal() {
    const amount = parseFloat(document.getElementById('withdrawalAmount').value);
    const fee = amount * 0.03;
    const totalReceived = amount - fee;
    
    if (confirm(`Confirm withdrawal of ₹${amount.toFixed(2)}?\n\nYou will receive: ₹${totalReceived.toFixed(2)}\nProcessing fee: ₹${fee.toFixed(2)}`)) {
        alert('Withdrawal request submitted successfully!');
        closeWithdrawalModal();
        
        // Update available balance (simulate)
        const currentBalance = 2150.75;
        const newBalance = currentBalance - amount;
        document.getElementById('availableBalance').textContent = `₹${newBalance.toFixed(2)}`;
    }
}

// Form submission
document.getElementById('signUpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulate user creation
    currentUser = {
        email: email,
        password: password,
        createdAt: new Date()
    };
    
    // Close sign up modal and open onboarding
    closeSignUpModal();
    openOnboardingModal();
});

// Close modals when clicking outside
window.onclick = function(event) {
    const signUpModal = document.getElementById('signUpModal');
    const onboardingModal = document.getElementById('onboardingModal');
    const dashboardModal = document.getElementById('dashboardModal');
    const withdrawalModal = document.getElementById('withdrawalModal');
    
    if (event.target === signUpModal) {
        closeSignUpModal();
    }
    if (event.target === onboardingModal) {
        closeOnboardingModal();
    }
    if (event.target === dashboardModal) {
        closeDashboard();
    }
    if (event.target === withdrawalModal) {
        closeWithdrawalModal();
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.problem-card, .trust-card, .pricing-block, .team-member').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add hover effects to hero CTA
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        heroCta.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});

// Simulate real-time data updates for dashboard
function updateDashboardData() {
    // This would typically fetch data from an API
    const summaryValues = document.querySelectorAll('.summary-value');
    if (summaryValues.length > 0) {
        // Simulate small fluctuations in investment value
        const currentValue = 2150.75;
        const fluctuation = (Math.random() - 0.5) * 20; // ±10 rupees
        const newValue = Math.max(0, currentValue + fluctuation);
        
        summaryValues[1].textContent = `₹${newValue.toFixed(2)}`;
        
        // Update growth percentage
        const growth = ((newValue - 2000) / 2000) * 100;
        summaryValues[2].textContent = `${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`;
        summaryValues[2].className = `summary-value ${growth >= 0 ? 'positive' : ''}`;
    }
}

// Update dashboard data every 30 seconds
setInterval(updateDashboardData, 30000);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        closeSignUpModal();
        closeOnboardingModal();
        closeDashboard();
        closeWithdrawalModal();
    }
});

// Add loading states for better UX
function showLoading(element) {
    const originalText = element.textContent;
    element.textContent = 'Loading...';
    element.disabled = true;
    
    return function hideLoading() {
        element.textContent = originalText;
        element.disabled = false;
    };
}

// Enhanced form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

// Add real-time form validation
document.getElementById('email').addEventListener('input', function() {
    const email = this.value;
    const isValid = validateEmail(email);
    
    if (email.length > 0) {
        this.style.borderColor = isValid ? '#10b981' : '#ef4444';
    } else {
        this.style.borderColor = '#e5e7eb';
    }
});

document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const isValid = validatePassword(password);
    
    if (password.length > 0) {
        this.style.borderColor = isValid ? '#10b981' : '#ef4444';
    } else {
        this.style.borderColor = '#e5e7eb';
    }
});

// Add success animations
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
