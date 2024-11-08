import React from "react";

const DishItem = ({dish, onClick}) => {
    return (
        <div className="dishItem" onClick={onClick}>
            <img src={dish.image} className="dishItemImg" alt="" />
            <div className="dishItemInfo">
                <h1 className="dishItemTitle">{dish.title}</h1>
                <p className="dishItemTime">~ {dish.readyInMinutes} min</p>
            </div>
        </div>
    )
}

export default DishItem;