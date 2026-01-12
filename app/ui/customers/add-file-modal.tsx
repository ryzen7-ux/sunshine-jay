"use client";

import { useState } from "react";
import { EditIcon, FileText } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Tooltip,
} from "@heroui/react";
import EditMemberForm from "./edit-member-form";
import FilesForm from "./files-form";
import { FileUpload } from "../file-upload";
import {
  revalidateIndividualFileUpload,
  revalidateMemberFileUpload,
} from "@/app/lib/actions";

export function AddFileModal({
  member,
  loanee,
}: {
  member: any;
  loanee: string;
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isOpenLoan, setIsOpenLoan] = useState(false);

  const handleUploadComplete = async (result: any) => {
    if (loanee === "member") {
      await revalidateMemberFileUpload(member?.groupid);
    } else {
      await revalidateIndividualFileUpload();
    }
  };

  return (
    <>
      <Tooltip color="primary" content="Add documents">
        <button onClick={() => setIsAddModalOpen(true)}>
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <FileText className="h-5 w-5 text-blue-500" />
          </span>
        </button>
      </Tooltip>
      <Modal
        isOpen={isAddModalOpen}
        onOpenChange={onOpenChange}
        onClose={() => {
          setIsAddModalOpen(false);
        }}
        size="xl"
        scrollBehavior="outside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Member Documents
                <p className="text-blue-500 uppercase">
                  {member?.name} {member?.firstname} {member?.surname}
                </p>{" "}
              </ModalHeader>
              <ModalBody>
                {/* <FilesForm member={member} onClose={onClose} loanee={loanee} /> */}
                <FileUpload
                  userType={loanee}
                  fileUrl={member?.passport}
                  member={member}
                  itemId={member?.id}
                  uploadedTitle="Passport Picture"
                  title="Upload Passport Picture"
                  currentInput="passport"
                  type="passport"
                  userId="SUNSHINE"
                  onUploadComplete={handleUploadComplete}
                />
                <FileUpload
                  userType={loanee}
                  fileUrl={member?.id_front}
                  member={member}
                  itemId={member?.id}
                  uploadedTitle="ID Front"
                  title="Upload ID Front"
                  currentInput="front"
                  type="front"
                  userId="SUNSHINE"
                  onUploadComplete={handleUploadComplete}
                />
                <FileUpload
                  userType={loanee}
                  fileUrl={member?.id_back}
                  member={member}
                  itemId={member?.id}
                  uploadedTitle="ID Back"
                  title="Upload ID Back"
                  currentInput="back"
                  type="back"
                  userId="SUNSHINE"
                  onUploadComplete={handleUploadComplete}
                />
                <FileUpload
                  userType={loanee}
                  fileUrl={member?.doc}
                  member={member}
                  itemId={member?.id}
                  uploadedTitle="Application Form"
                  title="Upload Application Form"
                  currentInput="form"
                  type="form"
                  userId="SUNSHINE"
                  onUploadComplete={handleUploadComplete}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
