import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}