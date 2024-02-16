import React, { useState, useEffect } from 'react';
import './App.css';

const Messages = [
    // {
    //     author: "loading",
    //     body: "...",
    //     timeout: 0
    // },
    {
        author: "bot",
        body: "Hello",
        timeout: 800
    },
    {
        author: "bot",
        body: "How may I help you?",
        timeout: 1500
    },
    {
        author: "bot",
        
        body: [
            {
                url: "/blog/",
                text: "Services"
            },
            {
                url: "/Contact Details",
                text: "Contact Details"
            },
            {
                url: "https://github.com/onefastsnail",
                text: "Something else"
            }
        ],
        timeout: 5000
    }
];

const Message = ({ data, handleClick }) => {
    const { author, body } = data;

    let finalBody;

    if (Array.isArray(body)) {
        finalBody = body.map((item, index) => {
            return (
                <a href="#" className="c-chat__action" key={index} onClick={() => handleClick(item)}>
                    {item.text}
                </a>
            );
        });
    } else {
        finalBody = <div className="c-chat__message">{body}</div>;
    }

    return (
        <li className={"c-chat__item c-chat__item--" + author}>{finalBody}</li>
    );
};

function App() {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        // Add initial messages when the component mounts
        if (chatMessages.length === 0) {
            setChatMessages(Messages);
        }
    }, [chatMessages]); // Add chatMessages to the dependencies array to ensure useEffect runs only once

    const handleClick = (option) => {
        switch (option.text) {
            case "Services":
                setChatMessages([
                    ...chatMessages,
                    {
                        author: "bot",
                        body: "Great, these are the services we provide:"
                    },
                    {
                        author: "bot",
                        body: [
                            { text: "Web Development", url: "/web-development" },
                            { text: "App Development", url: "/app-development" },
                            { text: "UI/UX Design", url: "/ui-ux" }
                        ]
                    }
                ]);
                break;
            case "Web Development":
                setChatMessages([
                    ...chatMessages,
                    {
                        author: "bot",
                        body: <span dangerouslySetInnerHTML={{ __html: "Web development: CodeStore is a trusted web application development company that has been assisting businesses with the best technical talent for years to design and build custom websites and web applications for businesses across various industries. We combine creativity, innovation, and robust programming to provide custom web application development. For more details visit: <a href='https://codestoresolutions.com/web-application-development/'>Click here</a>" }} />
                        
                    },{author: "bot",
                    body: [
                        { text: "Web Development", url: "/web-development" },
                        { text: "App Development", url: "/app-development" },
                        { text: "UI/UX Design", url: "/ui-ux" }
                    ]}
                ]);
                break;
            case "App Development":
                setChatMessages([
                    ...chatMessages,
                    {
                        author: "bot",
                        body: <span dangerouslySetInnerHTML={{ __html: "App development: We are one of the leading mobile application development companies in India and work extensively with businesses across various industries to build custom mobile applications to cater to business requirements. We understand the importance of having a robust mobile presence in today’s digital landscape and can create high-quality, user-friendly mobile apps for our clients across the globe. For more details visit: <a href='https://codestoresolutions.com/mobile-application-development/'>Click here</a>" }} />
                    },{author: "bot",
                    body: [
                        { text: "Web Development", url: "/web-development" },
                        { text: "App Development", url: "/app-development" },
                        { text: "UI/UX Design", url: "/ui-ux" }
                    ]}
                ]);
                break;
                case "UI/UX Design":
                  setChatMessages([
                      ...chatMessages,
                      {
                          author: "bot",
                          body: <span dangerouslySetInnerHTML={{ __html: "UI/UX Design: CodeStore offers various UI/UX services designed to help businesses create engaging and user-friendly digital experiences.In today’s fast-paced and competitive digital landscape, creating a great user experience is crucial to the success of any website, app, or product. A great UI/UX design can help businesses engage users, improve brand loyalty and increase conversions. For more details visit: <a href='https://codestoresolutions.com/ui-ux-design/'>Click here</a>" }} />
                      },{author: "bot",
                      body: [
                          { text: "Web Development", url: "/web-development" },
                          { text: "App Development", url: "/app-development" },
                          { text: "UI/UX Design", url: "/ui-ux" }
                          
                      ]}
                  ]);
                  break;

                  case "Contact Details":
                    setChatMessages([
                        ...chatMessages,
                        {
                            author: "bot",
                            body: <span dangerouslySetInnerHTML={{ __html: "Email Sales – <br>sales@codestoresolutions.com; <br> Enquiries –<br> info@codestoresolutions.com;<br> Recruitment –<br> hr@codestoresolutions.com <br>  Phone: <br>USA +1 (213) 814-4265<br>India +91 95997 20600We typically respond to any inquiry within one business day.Click here to contact us: <a href='https://codestoresolutions.com/ui-ux-design/'>Click here</a>" }} />
                        }
                    ]);
                    break;
            default:
                console.log("Default case");
                break;
        }
    };

    const scrollToBottom = () => {
        const chatContainer = document.querySelector(".c-chat__list");
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputValue = e.target.querySelector("input").value;
    
        // Create a new message object for the user's message
        const userMessage = {
            author: "human",
            body: inputValue
        };
    
        // Add the user's message just above the send message bar
        setChatMessages([...chatMessages, userMessage]);
    
        // Scroll to the bottom to show the latest message just above the send message bar
        scrollToBottom();
        
        e.target.reset();
    };
    
    return (
        <div className="main-card">
            <div className="main-title">
                <div>
                    <svg id="chatbot_toggle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M64 128v256h128V128H64zm224 0v256h128V128H288z" fill="currentColor"/>
                    </svg>
                </div>
                <span className="title">Codestore-Chatbot</span>
            </div>
            <div className="line"></div>
            <div className="chat-area">
                <ul className="c-chat__list">
                    {chatMessages.map((message, index) => (
                        <Message key={index} data={message} handleClick={handleClick} />
                    ))}
                </ul>
            </div>
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
