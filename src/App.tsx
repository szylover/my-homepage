import Greeting from './components/Greeting';
import SearchBar from './components/SearchBar';
import AppGrid from './components/AppGrid';
import StatusPanel from './components/StatusPanel';
import WeatherWidget from './components/WeatherWidget';
import TodoList from './components/TodoList';
import RssFeed from './components/RssFeed';
import NotePad from './components/NotePad';
import BookShelf from './components/BookShelf';
import './App.css';

export default function App() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <Greeting />
        <SearchBar />
      </header>

      <main className="dashboard-main">
        <section className="dashboard-row">
          <AppGrid />
          <StatusPanel />
        </section>

        <section className="dashboard-row">
          <WeatherWidget />
          <TodoList />
        </section>

        <section className="dashboard-row">
          <RssFeed />
          <NotePad />
        </section>

        <section className="dashboard-row full">
          <BookShelf />
        </section>
      </main>

      <footer className="dashboard-footer">
        <a href="https://github.com/szylover" target="_blank" rel="noopener noreferrer">GitHub @szylover</a>
        <span> · Powered by Azure Static Web Apps</span>
      </footer>
    </div>
  );
}
