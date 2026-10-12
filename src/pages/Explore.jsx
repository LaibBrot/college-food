import { useState, useEffect } from 'react';

export default function Explore() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://dummyjson.com/recipes?limit=12');
        if (!res.ok) throw new Error('Ошибка загрузки данных');
        const data = await res.json();
        setRecipes(data.recipes || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filtered = recipes.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Каталог Рецептов (Внешний API)</h2>
      
      <input 
        type="text" 
        placeholder="Поиск по рецептам..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '8px', marginBottom: '20px', width: '100%', maxWidth: '300px', borderRadius: '5px', border: '1px solid #a7a7a7'}}
      />

      {loading && <p>Загрузка данных с сервера...</p>}
      
      {error && (
        <div style={{ color: 'red', marginBottom: '15px' }}>
          <p>Произошла ошибка: {error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && <p>Ничего не найдено.</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px', }}>
        {!loading && !error && filtered.map(recipe => (
          <div key={recipe.id} style={{ border: '1px solid #444', padding: '12px', borderRadius: '8px', background: '#9dfa9a' }}>
            <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px' }} />
            <h3>{recipe.name}</h3>
            <p><strong>Кухня:</strong> {recipe.cuisine}</p>
            <p><strong>Калорийность:</strong> {recipe.caloriesPerServing} ккал</p>
          </div>
        ))}
      </div>
    </div>
  );
}