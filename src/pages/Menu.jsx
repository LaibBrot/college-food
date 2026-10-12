import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Menu() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'college_food'));
      const list = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setItems(list);
    };
    fetchItems();
  }, []);

  const filtered = items.filter(i => 
    i.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Меню Столовой Колледжа</h2>
      <input 
        type="text" 
        placeholder="Поиск по меню..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '8px', marginBottom: '20px', width: '100%', maxWidth: '300px', borderRadius: '5px', border: '1px solid #a7a7a7'}}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px'}}>
        {filtered.map(item => (
          <div key={item.id} style={{ border: '1px solid #a7a7a7', padding: '15px', borderRadius: '8px', background: '#9dfa9a' }}>
            <h3>{item.title}</h3>
            <p><strong>Категория:</strong> {item.category}</p>
            <p><strong>Цена:</strong> {item.price} ₸</p>
          </div>
        ))}
      </div>
    </div>
  );
}