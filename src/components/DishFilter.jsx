import React from "react";

const DishFilter = ({filter, setFilter}) => {
    return (
        <div className="filter">
            <div className="sort__wrapper">
                <div
                    onClick={() => setFilter({query: '', sort: 'dishName'})}
                    className={filter.sort === 'dishName' ? 'sort sort__active' : 'sort'}
                >
                    Dish name
                </div>
                <div
                    onClick={() => setFilter({query: '', sort: 'ingredients'})}
                    className={filter.sort === 'ingredients' ? 'sort sort__active' : 'sort'}
                >
                    Ingredients
                </div>
                <div
                    onClick={() => setFilter({query: '', sort: 'mySaved'})}
                    className={filter.sort === 'mySaved' ? 'sort sort__active' : 'sort'}
                >
                    My saved
                </div>
            </div>

            <div className="search__wrapper">
                <input
                    type="text"
                    placeholder="Search for the dishes"
                    className="searchInput"
                    value={filter.query}
                    onChange={e => setFilter({...filter, query: e.target.value})}
                />
            </div>
        </div>
    );
};

export default DishFilter;