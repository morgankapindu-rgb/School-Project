import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';

const List = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editedData, setEditedData] = useState({ name: '', description: '', price: '', category: '' });
  const url = "http://localhost:4000";

  // Fetch items from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/food`);
        setItems(response.data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/api/food/${id}`);
      setItems(items.filter(item => item._id !== id)); // Remove the deleted item from the state
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle edit (open edit form)
  const handleEdit = (item) => {
    setEditingItem(item._id);
    setEditedData({ name: item.name, description: item.description, price: item.price, category: item.category });
  };

  // Handle form change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  // Handle save edit
  const handleSave = async (id) => {
    try {
      await axios.put(`${url}/api/food/${id}`, editedData);
      setItems(items.map(item => (item._id === id ? { ...item, ...editedData } : item)));
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className="list-container">
      <h1>Food List</h1>
      {items.length > 0 ? (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item._id} className="item-card">
              <img src={`${url}/uploads/${item.image}`} alt={item.name} className="item-image" />
              <div className="item-details">
                {editingItem === item._id ? (
                  <div className="edit-form">
                    <input type="text" name="name" value={editedData.name} onChange={handleChange} placeholder="Name" />
                    <textarea name="description" value={editedData.description} onChange={handleChange} placeholder="Description"></textarea>
                    <input type="number" name="price" value={editedData.price} onChange={handleChange} placeholder="Price" />
                    <select name="category" value={editedData.category} onChange={handleChange}>
                      <option value="Salad">Salad</option>
                      <option value="Rolls">Rolls</option>
                      <option value="Desert">Desert</option>
                      <option value="Sandwich">Sandwich</option>
                      <option value="Cake">Cake</option>
                      <option value="Pure Veg">Pure Veg</option>
                      <option value="Pasta">Pasta</option>
                      <option value="Noodles">Noodles</option>
                    </select>
                    <button onClick={() => handleSave(item._id)}>Save</button>
                    <button onClick={() => setEditingItem(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <p>Price: ${item.price}</p>
                    <p>Category: {item.category}</p>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
};

export default List;
