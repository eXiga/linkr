import { trpc } from "@/utils/trpc";

export default function Home() {
  const links = trpc.links.getAll.useQuery();

  if (!links.data) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {links.data.map((l) => (
        <p key={l.id}>
          {l.title}: {l.url}
        </p>
      ))}
    </div>
  );
}
