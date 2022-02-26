import AdminTheme from "../../components/admin/theme/AdminTheme";

export default function AdminHome() {
  return (
    <AdminTheme>
      <div>
        <div className="rounded-t-3xl bg-gradient-to-r from-white via-[#FF9900] to-white p-4 text-center text-2xl shadow">
          <h1 className="pl-2 font-bold ">Analytics</h1>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 xl:w-1/3">
            <div className="rounded-lg border-b-4 border-green-600 bg-gradient-to-b from-green-200 to-green-100 p-5 shadow-xl">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full bg-green-600 p-5">
                    <i className="fa fa-wallet fa-2x fa-inverse"></i>
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">
                    Total Revenue
                  </h2>
                  <p className="text-3xl font-bold">
                    $3249{" "}
                    <span className="text-green-500">
                      <i className="fas fa-caret-up"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 xl:w-1/3">
            <div className="rounded-lg border-b-4 border-pink-500 bg-gradient-to-b from-pink-200 to-pink-100 p-5 shadow-xl">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full bg-pink-600 p-5">
                    <i className="fas fa-users fa-2x fa-inverse"></i>
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">
                    Total Users
                  </h2>
                  <p className="text-3xl font-bold">
                    249{" "}
                    <span className="text-pink-500">
                      <i className="fas fa-exchange-alt"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 xl:w-1/3">
            <div className="rounded-lg border-b-4 border-yellow-600 bg-gradient-to-b from-yellow-200 to-yellow-100 p-5 shadow-xl">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full bg-yellow-600 p-5">
                    <i className="fas fa-user-plus fa-2x fa-inverse"></i>
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">
                    New Users
                  </h2>
                  <p className="text-3xl font-bold">
                    2{" "}
                    <span className="text-yellow-600">
                      <i className="fas fa-caret-up"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 xl:w-1/3">
            <div className="rounded-lg border-b-4 border-blue-500 bg-gradient-to-b from-blue-200 to-blue-100 p-5 shadow-xl">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full bg-blue-600 p-5">
                    <i className="fas fa-server fa-2x fa-inverse"></i>
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">
                    Server Uptime
                  </h2>
                  <p className="text-3xl font-bold">152 days</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 xl:w-1/3">
            <div className="rounded-lg border-b-4 border-indigo-500 bg-gradient-to-b from-indigo-200 to-indigo-100 p-5 shadow-xl">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full bg-indigo-600 p-5">
                    <i className="fas fa-tasks fa-2x fa-inverse"></i>
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">
                    To Do List
                  </h2>
                  <p className="text-3xl font-bold">7 tasks</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 xl:w-1/3">
            <div className="rounded-lg border-b-4 border-red-500 bg-gradient-to-b from-red-200 to-red-100 p-5 shadow-xl">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full bg-red-600 p-5">
                    <i className="fas fa-inbox fa-2x fa-inverse"></i>
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">Issues</h2>
                  <p className="text-3xl font-bold">
                    3{" "}
                    <span className="text-red-500">
                      <i className="fas fa-caret-up"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminTheme>
  );
}
