import React from "react";
import { Modal } from "react-bootstrap";
import Card from "./Card";
import '../modal.css';

export default function CardDeck({ cards, show, modalHandler }) {
    return (
        <Modal
            show={show}
            onHide={() => modalHandler(false)}
            dialogClassName="my-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Card Deck
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h2>display cards here</h2>
                    {cards.map(card => <Card key={card.id} {...card}/>)}
                </div>
            </Modal.Body>
        </Modal>
    )
}