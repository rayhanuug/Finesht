import RankingCard from "@/component/fInvest";

type RankItem = {
  name: string;
  match: number;
};

type Props = {
  rankings: RankItem[];
};

export default function RankingPanel({ rankings }: Props) {
  const podium = rankings.slice(0, 3);  
  const rest = rankings.slice(3);        

  return (
    <div className="flex flex-col gap-4">
      {/* Rank */}
      <div className="flex items-end gap-3">
        {/* Rank 2 */}
        {podium[1] && (
          <div className="flex-1">
            <RankingCard
              rank={2}
              name={podium[1].name}
              match={podium[1].match}
              variant="podium"
            />
          </div>
        )}

        {/* Rank 1 */}
        {podium[0] && (
          <div className="flex-1 mb-4">
            <RankingCard
              rank={1}
              name={podium[0].name}
              match={podium[0].match}
              variant="podium"
            />
          </div>
        )}

        {/* Rank 3 */}
        {podium[2] && (
          <div className="flex-1">
            <RankingCard
              rank={3}
              name={podium[2].name}
              match={podium[2].match}
              variant="podium"
            />
          </div>
        )}
      </div>

      {/* rank 4 kebawah */}
      <div className="flex flex-col gap-5">
        {rest.map((item, index) => (
          <RankingCard
            key={index}
            rank={index + 4}
            name={item.name}
            match={item.match}
            variant="list"
          />
        ))}
      </div>

    </div>
  );
}