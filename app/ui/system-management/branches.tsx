import clsx from "clsx";
import { Aperture } from "lucide-react";
import EditRegion from "@/app/ui/system-management/edit-region";
import { DeleteRegion } from "@/app/ui/system-management/delete-region";
import EditBranch from "@/app/ui/system-management/edit-branch";
import { DeleteBranch } from "@/app/ui/system-management/delete-branch";

export default function Branches({
  users,
  branches,
  currentUser,
}: {
  users: any;
  branches: any;
  currentUser: any;
}) {
  return (
    <>
      <div className="mb-6 ">
        <div className="bg-white pr-2 rounded-xl  bg-gray-200 ">
          <div className="flex grow flex-col justify-between rounded-xl py-2 px-2 ">
            {branches.map((branch: any) => (
              <div
                key={branch.id}
                className={`rounded-xl shadow-sm  pl-1 bg-purple-700 mb-1  ${
                  branch.name === "default" ? "hidden" : ""
                }`}
              >
                <div className="bg-green-100 rounded-lg py-4 border-1 hover:bg-green-200">
                  <div className=" flex justify-between px-2">
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex items-center flex-wrap">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold md:text-lg uppercase">
                            {branch.name}
                          </p>
                          <p className=" text-sm text-gray-500 sm:block"></p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <p
                          className={`truncate text-sm font-extrabold md:text-lg flex justify-center`}
                        ></p>
                        <p
                          className={`truncate text-md text-green-500 font-extrabold pt-2 flex justify-center`}
                        ></p>
                      </div>
                    </div>
                    <div className="flex">
                      <EditBranch users={users} branch={branch} />
                      <DeleteBranch id={branch.id} currentUser={currentUser} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
