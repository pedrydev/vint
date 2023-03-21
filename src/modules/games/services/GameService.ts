import Game from '../models/Game';

const games: Game[] = [
  { id: '1', title: 'Warcraft III', creator: 'Blizzard' },
  { id: '2', title: 'Diablo II', creator: 'Blizzard' },
  { id: '3', title: 'World of Warcraft', creator: 'Blizzard' },
];

export default class GameService {
  static getAll(): Promise<Game[]> {
    return new Promise((res) => {
      setTimeout(() => res(games), 1000);
    });
  }

  static getOne(id: string): Promise<Game> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const index = games.findIndex((g) => g.id === id);
        if (index === -1) return rej(new Error('Game not found'));

        res(games[index]);
      }, 1000);
    });
  }
}
