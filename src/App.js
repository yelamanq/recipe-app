import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import './styles/App.css'
import DishFilter from "./components/DishFilter";
import DishList from "./components/DishList"
import RecipeService from "./API/RecipeService";
import { useFetching } from "./hooks/useFetching";
import { useDebounce } from "./hooks/useDebounce";
import MyModal from './components/UI/MyModal'
import DishCard from "./components/DishCard";

function App() {

  const [filter, setFilter] = useState({sort: 'dishName', query: ''})
  const debouncedQuery = useDebounce(filter.query, 700);
  const [dishes, setDishes] = useState([])
  const [mySaved, setMySaved] = useState(() => JSON.parse(localStorage.getItem('mySaved')) || []);

  const [selectedDish, setSelectedDish] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openDishCard = (dish) => {
    setSelectedDish(dish);
    setModalVisible(true);
  };

  const [fetchDishes, isDishesLoading, dishError] = useFetching( async() => {
    if (filter.sort === 'dishName') {
      const response = await RecipeService.getByDishName(filter.query);
      setDishes(response.data.results)
    }
    else if (filter.sort === 'ingredients') {
      const response = await RecipeService.getByIngredients(filter.query);
      setDishes(response.data)
    }
    else {
      const savedDishes = await Promise.all(
        mySaved.map(async (dishId) => {
            try {
                const response = await RecipeService.getByMySaved(dishId);
                return response.data;
            } catch (error) {
                console.log(`Failed to fetch dish with id ${dishId}:`, dishError);
                return null;
            }
        })
      );
      setDishes(savedDishes.filter(dish => dish !== null));
    }
  })

  useEffect(() => {
    setDishes([])
    if (filter.sort === 'mySaved'){
      fetchDishes()
    }
  }, [filter.sort])

  useEffect(() => {
    if (debouncedQuery && filter.sort !== 'mySaved') fetchDishes()
  }, [debouncedQuery])

  useEffect(() => {
    if (filter.sort === 'mySaved') {
      setDishes([]);
      fetchDishes();
    }
}, [mySaved]);

  return (
    <div className="App">
      <Header/>
      <div className="main">
        <h1 className="main__text"><span>What do you want to </span><span style={{color: '#45B975'}}>cook</span><span> today?</span></h1>
        <DishFilter setFilter={setFilter} filter={filter} />
        {isDishesLoading
          ? <span className="loader"></span> 
          : <DishList dishes={dishes} sort={filter.sort} mySaved={mySaved} setMySaved={setMySaved} openDishCard={openDishCard}/>
        }
        <MyModal visible={modalVisible} setVisible={setModalVisible}>
            {selectedDish && <DishCard dish={selectedDish} visible={modalVisible} sort={filter.sort} mySaved={mySaved} setMySaved={setMySaved}/>}
        </MyModal>
      </div>
    </div>
  );
}

export default App;