import { v4 as id } from "uuid";
import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)


  const shuffleArray = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((cardimg) => {
        return { id: id(), ...cardimg };
      });
    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null)
    setChoiceTwo(null)
  };

  const handleChoice = (card) => {
    choiceOne? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        const newCards = cards.map((card) => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true };
          } else {
            return card;
          }
        });
        setCards(newCards);
        resetTurn();
      } else {
        setTimeout(()=> {
          resetTurn()
        }, 2000)
      }
      
    }
  }, [choiceTwo, choiceOne]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false)
  };

  useEffect(() => {
    shuffleArray()
  }, [])
  console.log(cards);
  return (
    <div className="memory-game-container">
      <h2>Memory Game</h2>
      <button className="btn" onClick={shuffleArray}>
        Start Game
      </button>
      <div className="card-grid">
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          );
        })}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
