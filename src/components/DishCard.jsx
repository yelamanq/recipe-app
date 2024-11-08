import React, { useState } from "react";
import saveIcon from '../assets/images/save.svg';
import savedIcon from '../assets/images/saved.svg'
import { CSSTransition } from "react-transition-group";

const DishCard = ({ dish, visible, mySaved, setMySaved }) => {
    const hasInstructions = dish.analyzedInstructions?.[0]?.steps?.length > 0;
    const hasMissedIngredients = dish.missedIngredients?.length > 0;
    const hasExtendedIngredients = dish.extendedIngredients?.length > 0;
    const hasNutrients = dish.nutrition?.nutrients?.length > 1;

    const isDishSaved = (dishId) => {
        return mySaved.includes(dishId);
    };

    const saveDish = (dishId) => {
        if (!isDishSaved(dishId)) {
            const updatedSaved = [...mySaved, dishId];
            setMySaved(updatedSaved);
            localStorage.setItem('mySaved', JSON.stringify(updatedSaved));
        }
    };

    const removeDish = (dishId) => {
        const updatedSaved = mySaved.filter(id => id !== dishId);
        setMySaved(updatedSaved);
        localStorage.setItem('mySaved', JSON.stringify(updatedSaved));
    };

    const handleSave = () => {
        {isDishSaved(dish.id)
            ? removeDish(dish.id)
            : saveDish(dish.id)
        }
    }

    return (
        <CSSTransition
            in={visible}
            appear={true}
            timeout={500}
            classNames="card"
            unmountOnExit
        >
            <div className="card">
                <div className="cardTop" style={{ alignItems: "center" }}>
                    <img src={dish.image} className="cardImg" alt="" />
                    <div className="cardTopRight">
                        <div className="cardTitle">
                            <h1>{dish.title}</h1>
                            <img src={isDishSaved(dish.id) ? savedIcon : saveIcon} className="cardSaveIcon" alt="" onClick={handleSave} />
                        </div>
                        {hasNutrients && (
                            <div className="cardNutrients">
                                <p>{dish.nutrition.nutrients[0].name}: {dish.nutrition.nutrients[0].amount}{dish.nutrition.nutrients[0].unit}</p>
                                <p>{dish.nutrition.nutrients[1].name}: {dish.nutrition.nutrients[1].amount}{dish.nutrition.nutrients[1].unit}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="cardBottom">
                    <div className="cardInstructions">
                        <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Instructions</p>
                        {hasInstructions ? (
                            dish.analyzedInstructions[0].steps.slice(0, 4).map((step) => (
                                <p key={step.number}>{step.number}. {step.step}</p>
                            ))
                        ) : (
                            <p>No instructions</p>
                        )}
                    </div>

                    <div className="cardIngredients">
                        <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Ingredients</p>
                        {hasMissedIngredients ? (
                            dish.missedIngredients.slice(0, 5).map((i) => (
                                <p key={i.id}>{i.amount} {i.unit} {i.name}</p>
                            ))
                        ) : hasExtendedIngredients ? (
                            dish.extendedIngredients.slice(0, 5).map((i) => (
                                <p key={i.id}>{i.amount} {i.unit} {i.name}</p>
                            ))
                        ) : (
                            <p>No ingredients</p>
                        )}
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default DishCard;
