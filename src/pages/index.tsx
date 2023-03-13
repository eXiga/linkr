import { trpc } from "@/utils/trpc";
import { Link } from "@prisma/client";

export default function Home() {
  const links = trpc.links.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  if (!links.data) {
    return <div>Loading</div>;
  }

  return (
    <div className="h-full rounded-3xl bg-yellow-500">
      <ul>
        {links.data.map((link) => {
          return <li key={link.id}>{link.title}</li>;
        })}
      </ul>
    </div>
  );
}
