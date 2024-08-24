import { Button, IconButton } from "@mui/material";
import { Search, ArrowDownward } from "@mui/icons-material";

function AdminAllCourses() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">
          SKB PRO Dell G15 5515 Ryzen Edition LA-K453P 1.0 DELL G15 5515 factory
          BIOS AMD OK TESTED DONE SCREEN ALTER
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-200 rounded px-3">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search this topic..."
              className="bg-transparent p-2 outline-none"
            />
          </div>
          <Button variant="contained" color="primary">
            Post Reply
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="bg-white shadow mt-4 p-6 rounded-lg">
        {/* Post Content */}
        <div className="text-blue-700 text-2xl font-bold mb-4">
          SKB PRO Dell G15 5515 Ryzen Edition LA-K453P 1.0 DELL G15 5515 factory
          BIOS AMD OK TESTED DONE SCREEN ALTER
        </div>
        {/* Post Details */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <div>
            by <span className="font-bold text-gray-700">admin</span> • Thu Aug
            08, 2024 2:01 am
          </div>
          <div className="flex space-x-2">
            <IconButton size="small" color="primary">
              <Search />
            </IconButton>
            <IconButton size="small" color="primary">
              <ArrowDownward />
            </IconButton>
          </div>
        </div>
        {/* Attachments */}
        <div className="bg-gray-100 p-4 rounded-lg space-y-4">
          <div className="bg-orange-400 text-white p-4 flex justify-between items-center rounded-lg">
            <div>
              <div className="font-bold">
                DELL G15 5515 RYZEN EDITION LA-K453P 1.0 DELL G15 5515 FACTORY
                BIOS.RAR
              </div>
              <div className="text-sm">(4.65 MiB) Downloaded 1 time</div>
            </div>
            <ArrowDownward fontSize="large" />
          </div>
          <div className="bg-orange-400 text-white p-4 flex justify-between items-center rounded-lg">
            <div>
              <div className="font-bold">
                DELL G15 5515 RYZEN EDITION LA-K453P 1.0 DELL G15 5515 FACTORY
                BIOS.RAR
              </div>
              <div className="text-sm">(4.65 MiB) Downloaded 1 time</div>
            </div>
            <ArrowDownward fontSize="large" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6">
        <Button variant="contained" color="primary" className="bg-red-600">
          Post Reply
        </Button>
        <div className="text-center text-gray-500 mt-4">
          <a href="/" className="text-blue-500 hover:underline">
            Return to "SKB PRO 2024"
          </a>
        </div>
      </footer>
    </div>
  );
}

export default AdminAllCourses;
