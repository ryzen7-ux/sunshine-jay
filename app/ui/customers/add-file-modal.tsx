"use client";

import { useState } from "react";
import {
  EditIcon,
  FileText,
  CircleUserRoundIcon,
  FileUp,
  UserCheck,
} from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Tooltip,
} from "@heroui/react";
import { FileUpload } from "../file-upload";
import {
  revalidateIndividualFileUpload,
  revalidateMemberFileUpload,
} from "@/app/lib/actions";

export function AddFileModal({
  member,
  loanee,
  user,
}: {
  member: any;
  loanee: string;
  user: any;
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
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex justify-center items-center gap-2">
                  <FileUp className="h-6 text-green-500" />{" "}
                  <p className="font-extrabold text-2xl">
                    ADD MEMBER DOCUMENTS
                  </p>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <UserCheck className="text-blue-600 h-6 w-6" />
                  <p className="text-blue-500 uppercase">
                    {member?.name} {member?.firstname} {member?.surname}
                  </p>{" "}
                </div>
              </ModalHeader>
              <ModalBody>
                {/* <FilesForm member={member} onClose={onClose} loanee={loanee} /> */}
                <FileUpload
                  user={user}
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
                  user={user}
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
                  user={user}
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
                {/*<FileUpload*/}
                {/*  user={user}*/}
                {/*  userType={loanee}*/}
                {/*  fileUrl={member?.doc}*/}
                {/*  member={member}*/}
                {/*  itemId={member?.id}*/}
                {/*  uploadedTitle="Application Form"*/}
                {/*  title="Upload Application Form"*/}
                {/*  currentInput="form"*/}
                {/*  type="form"*/}
                {/*  userId="SUNSHINE"*/}
                {/*  onUploadComplete={handleUploadComplete}*/}
                {/*/>*/}
                <FileUpload
                  user={user}
                  userType={loanee}
                  fileUrl={member?.business_photo}
                  member={member}
                  itemId={member?.id}
                  uploadedTitle="Business Photo"
                  title="Upload Business Photo"
                  currentInput="businessPhoto"
                  type="businessPhoto"
                  userId="SUNSHINE"
                  onUploadComplete={handleUploadComplete}
                />
                <FileUpload
                  user={user}
                  userType={loanee}
                  fileUrl={member?.home_visit}
                  member={member}
                  itemId={member?.id}
                  uploadedTitle="Home Visit"
                  title="Upload Home Visit Photo"
                  currentInput="homeVisit"
                  type="homeVisit"
                  userId="SUNSHINE"
                  onUploadComplete={handleUploadComplete}
                />
                <hr />
                <div className="flex items-center justify-center gap-2">
                  <CircleUserRoundIcon className="h-5 w-5 text-pink-500" />{" "}
                  <h1 className="font-extrabold">NEXT OF KIN</h1>
                </div>
                <hr />
                <FileUpload
                  user={user}
                  userType={loanee}
                  fileUrl={member?.kin_photo}
                  member={member}
                  itemId={member?.id}
                  uploadedTitle="Next of Kin Photo"
                  title="Upload Next of Kin Photo"
                  currentInput="kinPhoto"
                  type="kinPhoto"
                  userId="SUNSHINE"
                  onUploadComplete={handleUploadComplete}
                />
                <FileUpload
                  user={user}
                  userType={loanee}
                  fileUrl={member?.kin_id_front}
                  member={member}
                  itemId={member?.id}
                  uploadedTitle="Next of Kin ID Front"
                  title="Upload Next of Kin ID Front"
                  currentInput="kinIdFront"
                  type="kinIdFront"
                  userId="SUNSHINE"
                  onUploadComplete={handleUploadComplete}
                />
                <FileUpload
                  user={user}
                  userType={loanee}
                  fileUrl={member?.kin_id_back}
                  member={member}
                  itemId={member?.id}
                  uploadedTitle="Next of Kin ID Back"
                  title="Upload Next of Kin ID Back"
                  currentInput="kinIdBack"
                  type="kinIdBack"
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
