import DataTable from "../../table";

export default function Dashboard() {
  return (
    <div className="px-[30px] py-4">
      <h1 className="text-xl font-semibold">Summary Section</h1>
      <div className="text-lg">
        <DataTable />
      </div>
    </div>
  );
}
