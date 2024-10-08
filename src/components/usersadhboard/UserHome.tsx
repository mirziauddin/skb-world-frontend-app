import PublicAllCourses from "../public/PublicAllCourses";

type Props = {};

export default function UserHome({}: Props) {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          <PublicAllCourses />
        </h1>
        {/* Add more user-specific content here */}
      </div>
    </div>
  );
}
