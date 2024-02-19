




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
                text: "Hello\nHow may I help you?",
                options: [
                    { url: "/blog/", text: "Services" },
                    { url: "/Contact Details", text: "Contact Details" },
                    { url: "https://github.com/onefastsnail", text: "Something else" }
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

    if (author === 'bot') {
        avatarImageSrc = 'images/chatbot.png'; // Path to the bot's avatar image
    } else {
        avatarImageSrc = 'images/user.png'; // Path to the user's avatar image
    }

    if (Array.isArray(body)) {
        finalBody = body.map((item, index) => {
            if (item.options) {
                return (
                    <div key={index}>
                        <div className="c-chat__message">{item.text}</div>
                        <div>
                            {item.options.map((option, optionIndex) => (
                                <a href="#" className="c-chat__action" key={optionIndex} onClick={() => handleClick(option)}>
                                    {option.text}
                                </a>
                            ))}
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
        <li className={"c-chat__item c-chat__item--" + author}>
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

    const handleClick = (option: MessageBody) => {
        switch (option.text) {


            case "Contact Details":
                toggleContactForm(); // Toggle the contact form
                break;


            case "Services":
                // Send user message indicating their choice
                const userMessage: Message = {
                    author: "user",
                    body: "Services",
                    timeout: 0
                };
                handleMessageDisplay(userMessage, chatMessages.length);
    
                // Send bot message introducing services
                const servicesMessage: Message = {
                    author: "bot",
                    body: "Great, these are the services we provide:",
                    
                    timeout: 0
                };
                handleMessageDisplay(servicesMessage, chatMessages.length + 1);
    
                // Send bot message with service options
                const serviceOptionsMessage: Message = {
                    author: "bot",
                    body: [
                        { text: "Web Development", url: "/web-development" },
                        { text: "App Development", url: "/app-development" },
                        { text: "UI/UX Design", url: "/ui-ux" }
                    ],
                    timeout: 0
                };
                handleMessageDisplay(serviceOptionsMessage, chatMessages.length + 2);
                    
    
                            
                            break;
                                            case "Web Development":
                                                setChatMessages([
                                                    ...chatMessages,
                                                    {
                                                        author: "bot",
                                                        body: "Great, these are the services we provide:",
                                                        timeout: 0 // Provide a default value if timeout is not meaningful
                                                    },
                                                    {
                                                        author: "bot",
                                                        body: [
                                                            { text: "Web Development", url: "/web-development" },
                                                            { text: "App Development", url: "/app-development" },
                                                            { text: "UI/UX Design", url: "/ui-ux" }
                                                        ],
                                                        timeout: 0 // Provide a default value if timeout is not meaningful
                                                    }
                                                ]);
                                                case "Web Development":
                                                    setChatMessages([
                                                        ...chatMessages,
                                                        {
                                                            author: "bot",
                                                            body: <span dangerouslySetInnerHTML={{ __html: "Web development: CodeStore is a trusted web application development company that has been assisting businesses with the best technical talent for years to design and build custom websites and web applications for businesses across various industries. We combine creativity, innovation, and robust programming to provide custom web application development. For more details visit: <a href='https://codestoresolutions.com/web-application-development/'>Click here</a>" }} />,
                                                            timeout: 0
                                                        },
                                                        {
                                                            author: "bot",
                                                            body: [
                                                                { text: "Web Development", url: "/web-development" },
                                                                { text: "App Development", url: "/app-development" },
                                                                { text: "UI/UX Design", url: "/ui-ux" }
                                                            ],
                                                            timeout: 0
                                                        }
                                                    ]);
                                                    break;
                                                
                                            case "App Development":
                                                setChatMessages([
                                                    ...chatMessages,
                                                    {
                                                        author: "bot",
                                                        body: <span dangerouslySetInnerHTML={{ __html: "App development: We are one of the leading mobile application development companies in India and work extensively with businesses across various industries to build custom mobile applications to cater to business requirements. We understand the importance of having a robust mobile presence in today’s digital landscape and can create high-quality, user-friendly mobile apps for our clients across the globe. For more details visit: <a href='https://codestoresolutions.com/mobile-application-development/'>Click here</a>" }} />,
                                                        timeout: 0 // Add timeout property as required by the Message interface
                                                    },
                                                    {
                                                        author: "bot",
                                                        body: [
                                                            { text: "Web Development", url: "/web-development" },
                                                            { text: "App Development", url: "/app-development" },
                                                            { text: "UI/UX Design", url: "/ui-ux" }
                                                        ],
                                                        timeout: 0 // Add timeout property as required by the Message interface
                                                    }
                                                ]);
                                                
                                                break;
                                                case "UI/UX Design":
                                                    setChatMessages([
                                                        ...chatMessages,
                                                        {
                                                            author: "bot",
                                                            body: <span dangerouslySetInnerHTML={{ __html: "UI/UX Design: CodeStore offers various UI/UX services designed to help businesses create engaging and user-friendly digital experiences.In today’s fast-paced and competitive digital landscape, creating a great user experience is crucial to the success of any website, app, or product. A great UI/UX design can help businesses engage users, improve brand loyalty and increase conversions. For more details visit: <a href='https://codestoresolutions.com/ui-ux-design/'>Click here</a>" }} />,
                                                            timeout: 0 // Add timeout property as required by the Message interface
                                                        },
                                                        {
                                                            author: "bot",
                                                            body: [
                                                                { text: "Web Development", url: "/web-development" },
                                                                { text: "App Development", url: "/app-development" },
                                                                { text: "UI/UX Design", url: "/ui-ux" }
                                                            ],
                                                            timeout: 0 // Add timeout property as required by the Message interface
                                                        }
                                                    ]);
                                                    
                            break;
                            
                        case "Contact Details":
                            
                        
                            handleMessageDisplay({
                                author: "bot",
                                body: "Here are our contact details:",
                                timeout: 0
                            }, 0);
                            const contactDetailsHTML = <span dangerouslySetInnerHTML={{ __html: "Email Sales – <br>sales@codestoresolutions.com; <br> Enquiries –<br> info@codestoresolutions.com;<br> Recruitment –<br> hr@codestoresolutions.com <br>  Phone: <br>USA +1 (213) 814-4265<br>India +91 95997 20600We typically respond to any inquiry within one business day.Click here to contact us: <a href='https://codestoresolutions.com/ui-ux-design/'>Click here</a>" }} />;
                            handleMessageDisplay({
                                author: "bot",
                                body: contactDetailsHTML,
                                timeout: 0
                            }, 1);
                            break;
                        default:
                            break;
                    }
            
    };

// Update the fetch URL in your frontend code to match the backend server's URL
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Access the form data from the event target
    const formData = new FormData(e.currentTarget);

    try {
        // Make an asynchronous request to submit the form data to the backend
        const response = await fetch('http://localhost:5000/api/contact', { // Update the URL to match your backend server's URL
            method: 'POST', // Or 'PUT', 'PATCH', etc. depending on your backend API
            body: formData
        });

        if (response.ok) {
            // If the response status is OK (2xx), you can handle it accordingly
            console.log('Form submitted successfully');
            // Optionally, you can reset the form fields or perform any other actions upon successful submission
        } else {
            // If the response status is not OK, handle the error
            console.error('Failed to submit form:', response.statusText);
            // Optionally, you can display an error message to the user or take other corrective actions
        }
    } catch (error) {
        // If an error occurs during the fetch operation, handle it here
        console.error('An error occurred while submitting the form:', error);
        // Optionally, you can display an error message to the user or take other corrective actions
    }
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
