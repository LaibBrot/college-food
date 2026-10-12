import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h1>Добро пожаловать в Столовую Колледжа!</h1>
      <p>Свежие обеды, горячая выпечка и напитки. Оформляйте заказы онлайн!</p>
      <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <Link to="/menu" style={{ padding: '10px 20px', background: '#007bff', color: '#fff', borderRadius: '5px', textDecoration: 'none' }}>
          Посмотреть меню
        </Link>
        <Link to="/explore" style={{ padding: '10px 20px', background: '#28a745', color: '#fff', borderRadius: '5px', textDecoration: 'none' }}>
          Рецепты (API)
        </Link>
      </div>
    </div>
  );
}