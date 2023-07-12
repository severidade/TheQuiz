import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../cliente';

interface Player {
  userName: string;
  userEmail: string;
  percentage: number;
}

export default function Ranking() {
  const [adultRanking, setAdultRanking] = useState<Player[]>([]);
  const [kidsRanking, setKidsRanking] = useState<Player[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        // Consulta o ranking de adultos
        const adultRankingResponse = await client
          .fetch<Player[]>('*[_type == "adult_ranking"]');
        const sortedAdultRanking = adultRankingResponse
          .sort((a, b) => b.percentage - a.percentage);
        setAdultRanking(sortedAdultRanking);

        // Consulta o ranking de crianças
        const kidsRankingResponse = await client
          .fetch<Player[]>('*[_type == "kids_ranking"]');
        const sortedKidsRanking = kidsRankingResponse
          .sort((a, b) => b.percentage - a.percentage);
        setKidsRanking(sortedKidsRanking);
      } catch (error) {
        console.error('Error fetching ranking:', error);
      }
    };

    fetchRanking();
  }, []);

  const generateUniqueKey = (name: string) => {
    const randomKey = Math.floor(Math.random() * 1000000);
    return `${name}-${randomKey}`;
  };

  return (
    <div className="ranking-page">
      <div className="title">
        <h1>Página Ranking</h1>
        <p>Aqui está o ranking:</p>
      </div>
      <div className="adult-ranking">
        <h2>Ranking de Adultos</h2>
        <ul>
          {adultRanking.map((player) => (
            <li key={ generateUniqueKey(player.userName) }>
              <strong>Nome:</strong>
              {' '}
              {player.userName}
              ,
              {' '}
              <strong>Email:</strong>
              {' '}
              {player.userEmail}
              ,
              {' '}
              <strong>Percentual de acertos:</strong>
              {' '}
              {player.percentage}
              %
            </li>
          ))}
        </ul>
      </div>
      <div className="kids-ranking">
        <h2>Ranking de Crianças</h2>
        <ul>
          {kidsRanking.map((player) => (
            <li key={ generateUniqueKey(player.userName) }>
              <strong>Nome:</strong>
              {' '}
              {player.userName}
              ,
              {' '}
              <strong>Email:</strong>
              {' '}
              {player.userEmail}
              ,
              {' '}
              <strong>Percentual de acertos:</strong>
              {' '}
              {player.percentage}
              %
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={ () => navigate('/') }
      >
        Início
      </button>
    </div>
  );
}
