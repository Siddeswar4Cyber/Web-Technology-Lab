import './App.js'
import React from 'react';
import { useState } from 'react';
import ItemList from './ItemList';

function App(){
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  const handleAddItem = () => {
    if(!input)  return;

    const newItem = {
      id : Date.now(),
      name : input
    };

    setItems((prev) => [...prev, newItem]);
    setInput('');
  };

  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  
  return (
    <div>
      <h1>Dynamic Item List</h1>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter item name"/>
      <button onClick={handleAddItem}>Add Item</button>
      <ItemList items={items} onRemoveItem={handleRemoveItem} />
    </div>
  );
}

export default App;