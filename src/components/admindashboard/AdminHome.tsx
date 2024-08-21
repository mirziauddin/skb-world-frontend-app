import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";

function AdminHome() {
  return (
    <main className="flex flex-col p-5 bg-green-900 text-white h-full overflow-y-auto">
      <div className="text-xl font-bold mb-5">DASHBOARD</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-700 p-4 rounded">
          <div className="flex justify-between items-center">
            <h3>TOTAL USER</h3>
            <BsFillArchiveFill className="text-2xl" />
          </div>
          <h1 className="text-3xl">300</h1>
        </div>
        <div className="bg-orange-600 p-4 rounded">
          <div className="flex justify-between items-center">
            <h3>PRIMIUM USER</h3>
            <BsFillGrid3X3GapFill className="text-2xl" />
          </div>
          <h1 className="text-3xl">12</h1>
        </div>
        <div className="bg-green-700 p-4 rounded">
          <div className="flex justify-between items-center">
            <h3>TOTAL CATAGORIES</h3>
            <BsPeopleFill className="text-2xl" />
          </div>
          <h1 className="text-3xl">33</h1>
        </div>
        <div className="bg-red-700 p-4 rounded">
          <div className="flex justify-between items-center">
            <h3>TOTAL SUBCATAGORY</h3>
            <BsFillBellFill className="text-2xl" />
          </div>
          <h1 className="text-3xl">42</h1>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
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
      </div> */}
    </main>
  );
}

export default AdminHome;
