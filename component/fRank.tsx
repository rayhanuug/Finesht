import RankingCard from "@/component/fInvest";

type RankItem = {
  name: string;
  match: number;
};

type Props = {
  rankings: RankItem[];
};

export default function RankingPanel({ rankings }: Props) {
  const podium = rankings.slice(0, 3);   // rank 1, 2, 3
  const rest = rankings.slice(3);         // rank 4, 5, dst

  return (
    <div className="flex flex-col gap-4">

      {/* Podium — rank 1 di tengah lebih tinggi */}
      <div className="flex items-end gap-3">
        {/* Rank 2 — kiri */}
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

        {/* Rank 1 — tengah, lebih tinggi */}
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

        {/* Rank 3 — kanan */}
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

      {/* List — rank 4 dst */}
      <div className="flex flex-col gap-2">
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