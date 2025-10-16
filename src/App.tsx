import React, { useState, useEffect } from "react";
import "./App.css";

const lettersData = [
  {
    id: 1,
    title: "A Heartfelt Love Letter 💌",
    category: "Love",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format",
    preview:
      "My dearest, from the moment I met you, everything changed. The world felt brighter...",
    full: `My dearest love,
    
From the moment I met you, everything changed. The world felt brighter, time felt slower, and my heart finally found its rhythm. Each day with you is a gift — your laughter is my favorite song, and your touch my peace. 

Forever yours,
— Alex 💖`,
  },
  {
    id: 2,
    title: "Condolence Letter 🕊️",
    category: "Condolence",
    image:
      "https://images.unsplash.com/photo-1516910919197-bfcfd0b5ed29?w=600&auto=format",
    preview:
      "Dear Sarah, I was deeply saddened to hear about your loss. Words cannot ease the pain...",
    full: `Dear Sarah,

I was deeply saddened to hear about your loss. Words cannot ease the pain you feel right now, but please know you are not alone. May the love of those around you bring comfort and strength.

With heartfelt sympathy,
— Michael 🕊️`,
  },
  {
    id: 3,
    title: "Apology Letter 🙏",
    category: "Apology",
    image:
      "https://images.unsplash.com/photo-1487412720507-7ec3e935d03b?w=600&auto=format",
    preview:
      "Dear Emma, I want to sincerely apologize for my behavior. I never meant to hurt you...",
    full: `Dear Emma,

I want to sincerely apologize for my behavior. I never meant to hurt you, and I realize now how much my actions affected you. You mean so much to me, and I’m committed to making things right.

Sincerely,
— John 🙏`,
  },
  {
    id: 4,
    title: "Thank You Letter 🌷",
    category: "Thank-You",
    image:
      "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=600&auto=format",
    preview:
      "Dear Professor, I wanted to take a moment to thank you for your guidance and support...",
    full: `Dear Professor,

I wanted to take a moment to thank you for your guidance and support. Your encouragement helped me believe in myself, and your lessons will stay with me forever.

Gratefully,
— Clara 🌷`,
  },
  {
    id: 5,
    title: "Professional Letter 💼",
    category: "Professional",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format",
    preview:
      "Dear Mr. Jameson, I’m writing to formally request a meeting to discuss our recent project...",
    full: `Dear Mr. Jameson,

I’m writing to formally request a meeting to discuss our recent project outcomes and potential next steps. I believe collaboration will help us achieve better efficiency and clearer direction moving forward.

Best regards,
— Natalie 💼`,
  },
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalLetter, setModalLetter] = useState(null);

  // Rotate letters every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % lettersData.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredLetters = lettersData.filter(
    (letter) =>
      letter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          ✖
        </button>
        <h2>Sixer 💌</h2>
        <div className="search-section">
          {searchOpen ? (
            <input
              type="text"
              placeholder="Search letters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          ) : (
            <button className="search-btn" onClick={() => setSearchOpen(true)}>
              🔍 Search
            </button>
          )}
        </div>

        <h3>Categories</h3>
        <ul>
          <li>Love</li>
          <li>Condolence</li>
          <li>Apology</li>
          <li>Thank You</li>
          <li>Professional</li>
        </ul>
        <hr />
        <h3>Other</h3>
        <ul>
          <li>Submit Letter</li>
          <li>About</li>
          <li>Terms</li>
        </ul>
      </div>

      {/* Sidebar Toggle */}
      <button
        className="toggle-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Main Section */}
      <div className="letters-container">
        {filteredLetters.map((letter, index) => (
          <div
            key={letter.id}
            className={`letter-card ${
              index === currentIndex ? "fade-in-slide" : ""
            }`}
          >
            <img src={letter.image} alt={letter.title} />
            <h4>{letter.title}</h4>
            <p>{letter.preview}</p>
            <button onClick={() => setModalLetter(letter)}>
              📖 Read Full Letter
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalLetter && (
        <div className="modal" onClick={() => setModalLetter(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setModalLetter(null)}>
              ✖
            </button>
            <h3>{modalLetter.title}</h3>
            <img src={modalLetter.image} alt={modalLetter.title} />
            <p>{modalLetter.full}</p>
          </div>
        </div>
      )}
    </div>
  );
}
