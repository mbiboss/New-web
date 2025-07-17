// Friday's Knowledge Base
const knowledgeBase = {
    greetings: ["Hello!", "Hi there!", "Greetings!", "How can I help you today?"],
    farewells: ["Goodbye!", "See you later!", "Have a great day!"],
    facts: {
        "your name": "I'm Friday, your personal assistant.",
        "the time": `The current time is ${new Date().toLocaleTimeString()}.`,
        "the date": `Today is ${new Date().toLocaleDateString()}.`,
        "your purpose": "I'm here to help you with information and daily tasks."
    },
    responses: {
        default: "I'm not sure how to answer that. Could you rephrase?",
        weather: "I can't check live weather without internet, but you can tell me your location and I'll remember it!",
        thanks: "You're welcome! Is there anything else I can help with?"
    }
};

// Friday's Memory
const fridayMemory = {
    userName: "",
    userLocation: "",
    reminders: []
};

// Natural Language Processing
function processInput(input) {
    input = input.toLowerCase().trim();
    
    // Check for greetings
    if (/(hello|hi|hey|greetings)/i.test(input)) {
        return getRandomResponse(knowledgeBase.greetings);
    }
    
    // Check for farewells
    if (/(goodbye|bye|see you|exit)/i.test(input)) {
        return getRandomResponse(knowledgeBase.farewells);
    }
    
    // Check for thanks
    if (/(thanks|thank you|appreciate)/i.test(input)) {
        return knowledgeBase.responses.thanks;
    }
    
    // Check for name questions
    if (/(your name|who are you)/i.test(input)) {
        return knowledgeBase.facts["your name"];
    }
    
    // Check for time/date
    if (/(time|what time is it)/i.test(input)) {
        return knowledgeBase.facts["the time"];
    }
    
    if (/(date|what day is it)/i.test(input)) {
        return knowledgeBase.facts["the date"];
    }
    
    // Check for weather
    if (/(weather|forecast|temperature)/i.test(input)) {
        return knowledgeBase.responses.weather;
    }
    
    // Check for stored facts
    for (const [question, answer] of Object.entries(knowledgeBase.facts)) {
        if (input.includes(question)) {
            return answer;
        }
    }
    
    // Default response
    return knowledgeBase.responses.default;
}

// Helper function
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Chat Interface Functions
function addMessageToChat(sender, message) {
    const chatContainer = document.getElementById('chat-container');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'friday-message');
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Event Listeners
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const userInput = this.value;
        if (userInput.trim() === '') return;
        
        addMessageToChat('user', userInput);
        this.value = '';
        
        // Simulate Friday "thinking"
        setTimeout(() => {
            const response = processInput(userInput);
            addMessageToChat('friday', response);
        }, 500);
    }
});

// Initial greeting
window.onload = function() {
    setTimeout(() => {
        addMessageToChat('friday', getRandomResponse(knowledgeBase.greetings));
    }, 300);
};

// Add to the knowledgeBase object
knowledgeBase.quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Stay hungry, stay foolish. - Steve Jobs"
];

knowledgeBase.jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!",
    "Why don't skeletons fight each other? They don't have the guts!"
];

// Update the processInput function
function processInput(input) {
    // Previous checks...
    
    // Add new checks before the default response
    
    // Check for quotes
    if (/(quote|inspiration|motivation)/i.test(input)) {
        return getRandomResponse(knowledgeBase.quotes);
    }
    
    // Check for jokes
    if (/(joke|funny|make me laugh)/i.test(input)) {
        return getRandomResponse(knowledgeBase.jokes);
    }
    
    // Check for math calculations
    const mathMatch = input.match(/(\d+)\s*([+\-*/])\s*(\d+)/);
    if (mathMatch) {
        const num1 = parseFloat(mathMatch[1]);
        const operator = mathMatch[2];
        const num2 = parseFloat(mathMatch[3]);
        
        let result;
        switch (operator) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': result = num1 / num2; break;
            default: return "I can only do basic math (+, -, *, /)";
        }
        
        return `The answer is ${result}`;
    }
    
    // Default response...
}

// Memory functions
function rememberName(input) {
    const nameMatch = input.match(/my name is (\w+)/i) || input.match(/call me (\w+)/i);
    if (nameMatch) {
        fridayMemory.userName = nameMatch[1];
        return `Nice to meet you, ${fridayMemory.userName}! I'll remember that.`;
    }
    return null;
}

function rememberLocation(input) {
    const locMatch = input.match(/i live in (\w+)/i) || input.match(/location is (\w+)/i);
    if (locMatch) {
        fridayMemory.userLocation = locMatch[1];
        return `I've noted you're in ${fridayMemory.userLocation}.`;
    }
    return null;
}

// Update processInput to include memory checks
function processInput(input) {
    // Previous checks...
    
    // Check for name memory
    const nameResponse = rememberName(input);
    if (nameResponse) return nameResponse;
    
    // Check for location memory
    const locResponse = rememberLocation(input);
    if (locResponse) return locResponse;
    
    // Check if user asked about remembered info
    if (/(what is my name|do you know my name)/i.test(input)) {
        return fridayMemory.userName 
            ? `Your name is ${fridayMemory.userName}!` 
            : "I don't know your name yet. Tell me with 'My name is...'";
    }
    
    if (/(where do i live|my location)/i.test(input)) {
        return fridayMemory.userLocation
            ? `You told me you're in ${fridayMemory.userLocation}.`
            : "I don't know your location yet. Tell me with 'I live in...'";
    }
    
    // Default response...
}

// Reminder functions
function addReminder(input) {
    const reminderMatch = input.match(/remind me to (.+) at (\d+:\d+)/i) || 
                         input.match(/set a reminder for (.+) at (\d+:\d+)/i);
    
    if (reminderMatch) {
        const task = reminderMatch[1];
        const time = reminderMatch[2];
        fridayMemory.reminders.push({ task, time });
        return `I'll remind you to ${task} at ${time}.`;
    }
    return null;
}

function checkReminders() {
    const now = new Date();
    const currentTime = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    
    const dueReminders = fridayMemory.reminders.filter(r => r.time === currentTime);
    if (dueReminders.length > 0) {
        dueReminders.forEach(reminder => {
            addMessageToChat('friday', `REMINDER: ${reminder.task}`);
        });
        // Remove the triggered reminders
        fridayMemory.reminders = fridayMemory.reminders.filter(r => r.time !== currentTime);
    }
}

// Update processInput
function processInput(input) {
    // Previous checks...
    
    // Check for reminders
    const reminderResponse = addReminder(input);
    if (reminderResponse) return reminderResponse;
    
    if (/(list reminders|show reminders)/i.test(input)) {
        if (fridayMemory.reminders.length === 0) {
            return "You don't have any reminders set.";
        }
        return "Your reminders:\n" + 
            fridayMemory.reminders.map(r => `- ${r.task} at ${r.time}`).join('\n');
    }
    
    // Default response...
}

// Check reminders every minute
setInterval(checkReminders, 60000);
