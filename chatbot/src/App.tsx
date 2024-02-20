




import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './ContactForm.tsx';
import ContactForm from './ContactForm.tsx';


interface Message {
    author: string;
    body: string | MessageBody[];
    timeout: number;
}

interface MessageBody {
    url: string;
    text: string;
}

const Messages: Message[] = [
    {
        author: "bot",
        body: "Hello",
        timeout: 800
    },
    {
        author: "bot",
        body: [
            {
                text: "How may I help you?",
                options: [
                    { url: "/blog/", text: "Services" },
                    { url: "/Contact Details", text: "Contact Details" },
                    // { url: "https://github.com/onefastsnail", text: "Something else" }
                ]
            }
        ],
        timeout: 5000
    
    }
];




interface MessageProps {
    data: Message;
    handleClick: (option: MessageBody) => void;
}
const Message: React.FC<MessageProps> = ({ data, handleClick }) => {
    const { author, body } = data;

    let finalBody: JSX.Element | JSX.Element[];
    let avatarImageSrc = '';
    let messageClass = '';

    if (author === 'bot') {
        avatarImageSrc = 'images/chatbot.png'; // Path to the bot's avatar image
        messageClass = 'c-chat__item--bot'; // Apply class for bot messages
    } else {
        avatarImageSrc = 'images/user.png'; // Path to the user's avatar image
        messageClass = 'c-chat__item--user'; // Apply class for user messages
    }

    if (Array.isArray(body)) {
        finalBody = body.map((item, index) => {
            if (item.options) {
                return (
                    <div key={index}>
                        <div class="c-chat__container">
                        <div className="c-chat__message">{item.text}</div>
                        <div>
                            {item.options.map((option, optionIndex) => (
                                <a href="#" className="c-chat__action" key={optionIndex} onClick={() => handleClick(option)}>
                                    {option.text}
                                </a>
                            ))}
                        </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="c-chat__message" key={index}>
                        {item.text}
                    </div>
                );
            }
        });
    } else {
        finalBody = <div className="c-chat__message">{body}</div>;
    }

    return (
        <li className={"c-chat__item " + messageClass}>
        <img src={avatarImageSrc} alt="Avatar" className="avatar" />
        <div className="message-content">{finalBody}</div>
    </li>
    );
};


const App: React.FC = () => {
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const chatAreaRef = useRef<HTMLDivElement>(null);
    

    
    const [showContactForm, setShowContactForm] = useState(false);
    const toggleContactForm = () => {
        console.log('Toggling contact form');
        setShowContactForm(!showContactForm);
    };
    
    

    useEffect(() => {
        if (chatMessages.length === 0) {
            setChatMessages(Messages);
        }
    }, [chatMessages]);

    useEffect(() => {
        if (chatAreaRef && chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const handleMessageDisplay = (message: Message, index: number) => {
        setTimeout(() => {
            setChatMessages(prevMessages => [...prevMessages, message]);
        }, index * 300);
    };

    console.log(chatMessages)

    const handleClick = (option: MessageBody) => {
        switch (option.text) {
            case "Contact Details":
                toggleContactForm(); // Toggle the contact form
                break;
            case "Services":
                const userMessage: Message = {
                    author: "user",
                    body: "Services",
                    timeout: 0
                };
                handleMessageDisplay(userMessage, chatMessages.length);
    
                const servicesMessage: Message = {
                    author: "bot",
                    body: [
                        {
                            text: "Great, these are the services we provide:",
                            options: [
                                { url: "/blog/", text: "Web Development" },
                                { url: "/Contact Details", text: "App Development" },
                                { url: "/Contact Details", text: "UI/UX Design" },
                            ]
                        }
                    ],
                    timeout: 0
                };
                handleMessageDisplay(servicesMessage, chatMessages.length + 1);
                break;
            case "Web Development":
                const webDevelopmentMessage: Message = {
                    author: "user",
                    body: "Web Development",
                    timeout: 0
                };
                handleMessageDisplay(webDevelopmentMessage, chatMessages.length);
    
                const webDevelopmentResponse: Message = {
                    author: "bot",
                    body: "Web development: CodeStore is a trusted web application development company that has been assisting businesses with the best technical talent for years to design and build custom websites and web applications for businesses across various industries. We combine creativity, innovation, and robust programming to provide custom web application development. For more details visit: <a href='https://codestoresolutions.com/web-application-development/'>Click here</a>",
                    timeout: 0
                };
                handleMessageDisplay(webDevelopmentResponse, chatMessages.length + 1);
                break;
            case "App Development":
                const appDevelopmentMessage: Message = {
                    author: "user",
                    body: "App Development",
                    timeout: 0
                };
                handleMessageDisplay(appDevelopmentMessage, chatMessages.length);
    
                const appDevelopmentResponse: Message = {
                    author: "bot",
                    body: "App development: We are one of the leading mobile application development companies in India and work extensively with businesses across various industries to build custom mobile applications to cater to business requirements. We understand the importance of having a robust mobile presence in today’s digital landscape and can create high-quality, user-friendly mobile apps for our clients across the globe. For more details visit: <a href='https://codestoresolutions.com/mobile-application-development/'>Click here</a>",
                    timeout: 0
                };
                handleMessageDisplay(appDevelopmentResponse, chatMessages.length + 1);
                break;
            case "UI/UX Design":
                const uiUxDesignMessage: Message = {
                    author: "user",
                    body: "UI/UX Design",
                    timeout: 0
                };
                handleMessageDisplay(uiUxDesignMessage, chatMessages.length);
    
                const uiUxDesignResponse: Message = {
                    author: "bot",
                    body: "UI/UX Design: CodeStore offers various UI/UX services designed to help businesses create engaging and user-friendly digital experiences.In today’s fast-paced and competitive digital landscape, creating a great user experience is crucial to the success of any website, app, or product. A great UI/UX design can help businesses engage users, improve brand loyalty and increase conversions. For more details visit: <a href='https://codestoresolutions.com/ui-ux-design/'>Click here</a>",
                    timeout: 0
                };
                handleMessageDisplay(uiUxDesignResponse, chatMessages.length + 1);
                break;
            default:
                break;
        }
    };
    
    

    

// Update the fetch URL in your frontend code to match the backend server's URL
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Access the form data from the event target
    const formData = new FormData(e.currentTarget);
    const userInput = formData.get('input') as string;

    // Create a bot response based on user input
    let botResponse: Message;

    switch (userInput.toLowerCase()) {
        case 'hi':
            botResponse = {
                author: 'bot',
                body: 'Hi ',
                timeout: 0
            };
            break;
            case 'bye':
            botResponse = {
                author: 'bot',
                body: 'Bye, See you soon',
                timeout: 0
            };
            break;

            
        // Add more cases for different user inputs and their corresponding bot responses here
        default:
            botResponse = {
                author: 'bot',
                body: "I'm sorry, I didn't understand that.",
                timeout: 0
            };
            break;
    }

    // Add the user's message to the chat
    const userMessage: Message = {
        author: 'user',
        body: userInput,
        timeout: 0
    };

    // Display the user's message and the bot's response
    handleMessageDisplay(userMessage, chatMessages.length);
    handleMessageDisplay(botResponse, chatMessages.length + 1);

    // Clear the input field after submission
    e.currentTarget.reset();
};

    
    

    return (
        <div className="main-card">
            <div className="main-title">
                <div>
                    <img src="/images/codestore-2.png" alt="Codestore Logo" className="logo" />
                </div>
                <span className="title">Codestore-Chatbot</span>
            </div>
            <div className="line"></div>
            <div className="chat-area" ref={chatAreaRef}>
                <ul className="c-chat__list">
                    {chatMessages.map((message, index) => (
                        <Message key={index} data={message} handleClick={handleClick} />
                    ))}
                </ul>
            </div>
            
     
            {showContactForm && <ContactForm />}


            <form className="input-div" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="input"
                    className="input-message"
                    placeholder="Type your message here..."
                    autoComplete="off"
                    required
                />
                <button type="submit" className="input-send">
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M490.2 232.7L61.8 4.5C55-1.4 45.3-.4 39.3 5.3c-6 5.7-6.8 14.8-1.1 20.8L443.5 255 38.2 486.9c-5.7 6-5 15.1 1.1 20.8 3.4 3.2 7.8 4.7 12.2 4.7 4.4 0 8.8-1.6 12.2-4.7l428.4-228.2c6.1-5.8 6.8-15 .9-20.8z" fill="currentColor"/>
                    </svg>
                </button>
            </form>
        </div>
    );
}

export default App;
