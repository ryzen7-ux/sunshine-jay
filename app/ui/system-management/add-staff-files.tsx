"use client";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Form,
  Input,
  Spinner,
  addToast,
  Select,
  SelectItem,
  Tooltip,
} from "@heroui/react";
import { Button } from "@heroui/react";
import {
  EyeIcon,
  EyeSlashIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/solid";
import { updateStaff } from "@/app/lib/sun-actions";
import { Files } from "lucide-react";
import StaffFilesForm from "@/app/ui/system-management/staff-files-form";
import { FileUpload } from "@/app/ui/file-upload";
import { StaffFileUpload } from "@/app/ui/system-management/staff-file-upload";
import { User } from "next-auth";
import {
  revalidateIndividualFileUpload,
  revalidateMemberFileUpload,
  revalidateSystemFileUpload,
} from "@/app/lib/actions";

const roles = [
  { key: "admin", label: "Admin" },
  { key: "manager", label: "Manager" },
  { key: "staff", label: "Staff" },
];
const status = [
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
  { key: "on-leave", label: "On-Leave" },
];

export default function AddStaffFiles({
  user,
  currentUser,
}: {
  user: any;
  currentUser: any;
}) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    role: user.role || "",
    status: user.status || "",
    password: user.password || "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleUploadComplete = async (result: any) => {
    await revalidateSystemFileUpload();
  };
  return (
    <>
      <Tooltip color="success" content="Add Documents">
        <button
          className="pr-3"
          onClick={(event) => {
            setIsModalOpen(true);
          }}
        >
          <Files className="h-6 w-6 text-blue-500 hover:text-blue-600" />
        </button>
      </Tooltip>

      {/* Is add staff Modal */}
      <Modal
        isOpen={isModalOpen}
        onOpenChange={onOpenChange}
        onClose={() => setIsModalOpen(false)}
        size="xl"
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-1">
                <Files className="h-8 w-8 text-green-400" />{" "}
                <span className="text-lg font-extrabold">
                  Add Staff Documents
                </span>
              </ModalHeader>
              <ModalBody>
                <StaffFileUpload
                  userType="staff"
                  fileUrl={user?.passport_url}
                  member={user}
                  itemId={user?.id}
                  uploadedTitle="Passport Picture"
                  title="Upload Passport Picture"
                  currentInput="passport"
                  type="passport"
                  userId="SUNSHINE"
                  onUploadComplete={handleUploadComplete}
                />
                <StaffFileUpload
                  userType="staff"
                  fileUrl={user?.application_form_url}
                  member={user}
                  itemId={user?.id}
                  uploadedTitle="Application Document"
                  title="Upload Application Document"
                  currentInput="application"
                  type="application"
                  userId="SUNSHINE"
                  onUploadComplete={handleUploadComplete}
                />
                <div className="flex gap-4 py-2">
                  <Button color="success" variant="solid" onPress={onClose}>
                    Close
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
