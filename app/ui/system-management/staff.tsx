"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Tooltip,
  Chip,
  addToast,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import {
  EllipsisVertical,
  Trash,
  Edit,
  FileCheck2,
  FileCheck,
  EyeIcon,
} from "lucide-react";
import EditStaff from "@/app/ui/system-management/edit-staff";
import { DeleteStaff } from "@/app/ui/system-management/buttons";
import { boolean } from "zod";
import AddStaffFiles from "@/app/ui/system-management/add-staff-files";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";

export default function Staff({
  users,
  currentUser,
}: {
  users: any;
  currentUser: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffData, setStaffData] = useState<any>();
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const { onOpenChange } = useDisclosure();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {users?.map((user: any) => (
        <Card
          className={`hover:shadow-md hover:shadow-green-500 shadow-sm shadow-green-600 border ${
            user.name === "henry-admin" ? "hidden" : ""
          }`}
          key={user.id}
        >
          <CardHeader>
            <div className="flex justify-between w-full">
              <div className="flex gap-3">
                <Image
                  alt="user image"
                  height={50}
                  radius="sm"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&s"
                  width={50}
                  className=""
                />
                <div className="flex flex-col">
                  <p className="text-md">{user.name}</p>
                  <p className="text-small text-default-500">{user.email}</p>
                </div>
              </div>{" "}
              <div className="">
                <AddStaffFiles user={user} currentUser={currentUser} />
                <EditStaff user={user} />
                <DeleteStaff id={user.id} user={currentUser} />
              </div>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-col gap-4">
              <div className="text-small text-default-500">
                Role:{" "}
                <Chip color="primary" size="sm">
                  {user?.role}
                </Chip>
              </div>
              <div className="text-small text-default-500">
                Status:{" "}
                <Chip
                  color={`${user?.status === "active" ? "success" : user?.status === "inactive" ? "danger" : "warning"}`}
                  size="sm"
                  variant="shadow"
                >
                  {user?.status}
                </Chip>
              </div>
              <p className="text-small text-default-500">Phone: {user.phone}</p>
              <div>
                <Button
                  color="warning"
                  size="sm"
                  startContent={<DocumentDuplicateIcon className="h-3 w-3" />}
                  onPress={() => {
                    setIsDocModalOpen(true);
                    setStaffData(user);
                  }}
                >
                  VIEW DOCUMENTS
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
      <Modal
        isOpen={isDocModalOpen}
        onOpenChange={onOpenChange}
        size="full"
        className="overflow-auto"
        onClose={() => setIsDocModalOpen(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                STAFF DOCUMENTS
              </ModalHeader>
              <ModalBody>
                <div className="w-full">
                  <div className="flex px-4 py-2">
                    <div className="text-green-500">
                      <FileCheck2 />
                    </div>
                    <p className="px-2 uppercase">
                      {`${staffData.name ?? ""} `} Documents
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    {staffData.passport_url ? (
                      <div className="flex flex-col items-center">
                        <h1 className="font-extrabold">PASSPORT</h1>
                        <Image
                          isZoomed
                          src={`${staffData.passport_url}`}
                          alt="No image"
                          className="w-full"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center border border-green-500 rounded-md text-green-700">
                        No passport
                      </div>
                    )}
                    {staffData?.application_form_url ? (
                      <div className="border rounded-lg py-4">
                        {" "}
                        <div className="flex flex-col items-center justify-center gap-4">
                          <FileCheck className="h-12 w-12 text-green-600" />
                          <div className="flex flex-col gap-2  text-center">
                            <p className="text-sm  text-muted-foreground mb-4">
                              Application Document
                            </p>
                            <a
                              href={`pdf-view?pdfUrl=${staffData?.application_form_url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="items-center px-4 py-2 bg-green-600 text-primary-foreground rounded hover:bg-green-500  text-sm"
                            >
                              View Document
                            </a>
                            <a
                              href={`${staffData?.application_form_url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block px-4 py-2 bg-blue-600 text-primary-foreground rounded hover:bg-blue-500  text-sm"
                            >
                              Download Document
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center border border-green-500 rounded-md text-green-700 p-2">
                        No application Document
                      </div>
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
