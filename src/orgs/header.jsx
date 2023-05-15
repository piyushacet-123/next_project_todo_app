import Link from "next/link";

export const Header = () => {
  const listHeader = [
    {
      id: 1,
      title: "Add todo",
      url: "/add_todo",
    },
    {
      id: 2,
      title: "list of todo",
      url: "/list_todos",
    },
  ];

  return (
    <div className="bg-blue-400 py-4">
      <div className="container mx-auto">
        <div className="flex flex-row">
          {listHeader.map((item) => {
            return (
              <div key={item.id} className="px-4">
                <Link href={item.url}>
                  <div className="text-white font-bold">{item.title}</div>
                </Link>
                {/* <p className="text-white font-bold">{item.title}</p> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
