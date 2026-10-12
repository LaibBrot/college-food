import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Горячее');

  const fetchItems = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'college_food'));
    const list = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    setItems(list);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !price || !currentUser) return;
    
    await addDoc(collection(db, 'college_food'), {
      title,
      price: Number(price),
      category,
      userId: currentUser?.uid || '',
      createdAt: new Date()
    });
    
    setTitle('');
    setPrice('');
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить это блюдо из списка?')) {
      await deleteDoc(doc(db, 'college_food', id));
      fetchItems();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Личный кабинет студента</h2>
      <p>Вы вошли как: <strong>{currentUser?.email}</strong></p>
      <button onClick={logout} style={{ padding: '6px 12px', marginBottom: '20px' }}>Выйти</button>

      <hr />

      <h3>Добавить новое блюдо в заказ/меню (CRUD: Create)</h3>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Название блюда" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #a7a7a7'}}
        />
        <input 
          type="number" 
          placeholder="Цена (₸)" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
          style={{ padding: '8px', width: '100px', borderRadius: '5px', border: '1px solid #a7a7a7'}}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #a7a7a7'}}>
          <option value="Горячее">Горячее</option>
          <option value="Выпечка">Выпечка</option>
          <option value="Напитки">Напитки</option>
        </select>
        <button type="submit" style={{ padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Добавить
        </button>
      </form>

      <h3>Список блюд (CRUD: Read & Delete)</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}>
            <span><strong>{item.title}</strong> ({item.category}) — {item.price} ₸</span>
            <button onClick={() => handleDelete(item.id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}