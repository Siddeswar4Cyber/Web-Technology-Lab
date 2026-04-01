import React from 'react';

function ItemList({ items, onRemoveItem }) {
    return (
        <div style={{ marginTop: '10px' }}>
            {items.length === 0 ? (
                <p style={{ color: "gray" }}>No items available</p>
            )
            :
            (
                <ul>
                    {items.map((item) => (
                        <li key={item.id} style= {{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'300px'}}>
                            <span>{item.name}</span>
                            <button style={{ marginLeft: "10px", color: "red" }} onClick={() => onRemoveItem(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ItemList;
