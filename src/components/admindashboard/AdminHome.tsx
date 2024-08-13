import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function AdminHome() {
  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <main className="flex flex-col p-5 bg-gray-900 text-white h-full overflow-y-auto">
      <div className="text-xl font-bold mb-5">DASHBOARD</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-700 p-4 rounded">
          <div className="flex justify-between items-center">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="text-2xl" />
          </div>
          <h1 className="text-3xl">300</h1>
        </div>
        <div className="bg-orange-600 p-4 rounded">
          <div className="flex justify-between items-center">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="text-2xl" />
          </div>
          <h1 className="text-3xl">12</h1>
        </div>
        <div className="bg-green-700 p-4 rounded">
          <div className="flex justify-between items-center">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="text-2xl" />
          </div>
          <h1 className="text-3xl">33</h1>
        </div>
        <div className="bg-red-700 p-4 rounded">
          <div className="flex justify-between items-center">
            <h3>ALERTS</h3>
            <BsFillBellFill className="text-2xl" />
          </div>
          <h1 className="text-3xl">42</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        <div className="h-64 bg-white rounded">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-64 bg-white rounded">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default AdminHome;
