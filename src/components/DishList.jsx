import React, { useState } from "react";
import noResultIcon from '../assets/images/noResult-icon.svg'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import DishItem from "./DishItem";

const DishList = ({dishes, openDishCard}) => {
    if (!dishes.length) {
        return (
            <div className="noResult" style={{marginTop: 100}}>
                <img style={{height: 40, marginRight: 20}} src={noResultIcon} alt="" />
                <h1 style={{color: '#BEBEBE', fontWeight: 600, fontSize: 25}}>No Result</h1>
            </div>
        )
    }

    return (
        <div>
            <TransitionGroup className="dishList">
                {dishes.map((dish) => 
                    dish.title.length <= 35 && (
                        <CSSTransition
                            key={dish.id}
                            timeout={500}
                            classNames="dish"
                        >
                            <DishItem dish={dish} onClick={() => openDishCard(dish)} />
                        </CSSTransition>
                    )
                )}
            </TransitionGroup>
        </div>
    )
}

export default DishList;