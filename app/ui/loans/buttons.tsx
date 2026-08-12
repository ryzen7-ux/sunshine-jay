"use client";

import { useState } from "react";
import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  CloudArrowUpIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { deleteLoan } from "@/app/lib/sun-actions";
import {
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  addToast,
  Spinner,
} from "@heroui/react";
import { Trash2Icon, Trash2, Eye, Pen, AlertTriangleIcon } from "lucide-react";
import CreateLoanForm from "./loan-from";
import EditLoanForm from "./edit-form";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { FileUpload } from "@/app/ui/file-upload";
import { LoanFileUpload } from "@/app/ui/loans/loan-file-upload";
import { revalidateLoanFileUpload } from "@/app/lib/actions";

export function CreateInvoice({
  groups,
  members,
  isAdmin,
}: {
  groups: any;
  members: any;
  isAdmin: boolean;
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleDeleteParam = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("memberQuery");

    replace(`${pathname}?${params.toString()}`);
  }, 100);

  return (
    <>
      {" "}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">New Loan</span>{" "}
        <PlusIcon className="h-5 md:ml-4" />
      </button>
      <Modal
        isOpen={isAddModalOpen}
        onOpenChange={onOpenChange}
        onClose={() => {
          setIsAddModalOpen(false);
          handleDeleteParam();
        }}
        size="xl"
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Loan
              </ModalHeader>
              <ModalBody>
                <CreateLoanForm
                  groups={groups}
                  members={members}
                  onClose={onClose}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export function UpdateLoan({
  id,
  loan,
  user,
}: {
  id: string;
  loan: any;
  user: any;
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      {" "}
      <Tooltip color="secondary" content="Edit Loan">
        <Button
          size="sm"
          onPress={() => setIsEditModalOpen(true)}
          className="gap-0"
          color="secondary"
          startContent={<PencilIcon className="w-5" />}
          isDisabled={user[0].role !== "admin"}
        ></Button>
      </Tooltip>
      <Modal
        isOpen={isEditModalOpen}
        onOpenChange={onOpenChange}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
        size="2xl"
        shadow="md"
        placement="center"
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Loan
              </ModalHeader>
              <ModalBody>
                <EditLoanForm loan={loan} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export function DeleteLoan({ id, user }: { id: string; user: any }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsDeleting(true);
    e.preventDefault();
    const deleteInvoiceWithId = await deleteLoan(id);
    if (deleteInvoiceWithId.success === true) {
      setIsDeleting(false);
      addToast({
        color: "warning",
        title: "Item deleted!",
      });

      onClose();
    } else {
      setIsDeleting(false);
      addToast({
        color: "danger",
        title: "Failed to delete Item!",
      });
    }
  };

  return (
    <>
      <Tooltip color="danger" content="Delete Loan Item">
        <Button
          onPress={onOpen}
          className="gap-0"
          size="sm"
          color="danger"
          startContent={<TrashIcon className="w-5" />}
          isDisabled={user[0].name !== "henry-admin"}
        >
          <span className="sr-only">Delete</span>
        </Button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <AlertTriangleIcon className="h-8 w-8 text-red-800" />
              </ModalHeader>
              <ModalBody>
                <p className="text-lg">
                  Are you sure you want to delete this item?
                </p>
              </ModalBody>
              <ModalFooter>
                <form onSubmit={handleDelete}>
                  <Button type="submit" color="danger">
                    {isDeleting ? <Spinner color="default" /> : "YES"}
                  </Button>
                </form>
                <Button color="primary" onPress={onClose}>
                  NO
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export function UploadLoanDocument({ loan, user }: { loan: any; user: any }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleUploadComplete = async () => {
    await revalidateLoanFileUpload();
  };

  return (
    <>
      <Tooltip color="success" content="Application Form">
        <Button
          onPress={onOpen}
          className="gap-0"
          size="sm"
          color="success"
          startContent={<DocumentArrowUpIcon className="w-5 text-gray-100" />}
        >
          <span className="sr-only">Delete</span>
        </Button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-1">
                <CloudArrowUpIcon className="h-8 w-8 text-green-800" />
                <h1 className="font-extrabold uppercase">
                  Loan Application Form
                </h1>
              </ModalHeader>
              <ModalBody>
                <LoanFileUpload
                  user={user}
                  userType="loan"
                  fileUrl={loan?.form_url}
                  member=""
                  itemId={loan?.id}
                  uploadedTitle="Application Form"
                  title="Upload Loan Application Form"
                  currentInput="form"
                  type="form"
                  userId="SUNSHINE"
                  onUploadComplete={handleUploadComplete}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export function ProcessDisbursement() {
  return (
    <Link
      href="/dashboard/loans/process-disbursement"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Process Disbursement</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
