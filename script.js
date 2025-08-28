 document.addEventListener('DOMContentLoaded', function() {
            const options = document.querySelectorAll('.option');
            const submitBtn = document.getElementById('submit-btn');
            const successMessage = document.getElementById('success-message');
            let score = 0;
            let answeredQuestions = 0;
            
            options.forEach(option => {
                option.addEventListener('click', function() {
                    const question = this.closest('.question');
                    const optionsInQuestion = question.querySelectorAll('.option');
                    const explanation = question.querySelector('.explanation');
                    
                    // Check if this question was already answered
                    if (question.classList.contains('answered')) {
                        return;
                    }
                    
                    // Remove any existing selections in this question
                    optionsInQuestion.forEach(opt => {
                        opt.classList.remove('selected', 'correct', 'incorrect');
                    });
                    
                    // Mark this option as selected
                    this.classList.add('selected');
                    
                    // Check if the answer is correct
                    if (this.getAttribute('data-correct') === 'true') {
                        this.classList.add('correct');
                        score++;
                    } else {
                        this.classList.add('incorrect');
                        
                        // Also highlight the correct answer
                        optionsInQuestion.forEach(opt => {
                            if (opt.getAttribute('data-correct') === 'true') {
                                opt.classList.add('correct');
                            }
                        });
                    }
                    
                    // Show explanation
                    explanation.classList.add('show');
                    
                    // Mark question as answered
                    question.classList.add('answered');
                    answeredQuestions++;
                    
                    // Update score
                    const scoreContainer = document.querySelector('.score-container');
                    const scoreElement = document.querySelector('.score');
                    scoreElement.textContent = score;
                    scoreContainer.classList.add('show');
                    
                    // Disable further clicks on options in this question
                    optionsInQuestion.forEach(opt => {
                        opt.style.pointerEvents = 'none';
                    });
                });
            });
            
            submitBtn.addEventListener('click', function() {
                // Check if all questions are answered
                if (answeredQuestions < 5) {
                    alert('Please answer all questions before submitting.');
                    return;
                }
                
                // Show success message
                successMessage.classList.add('show');
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Change button text
                this.textContent = 'Quiz Submitted!';
                this.style.background = 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)';
                this.disabled = true;
            });
        });