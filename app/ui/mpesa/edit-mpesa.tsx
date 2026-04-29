"use client";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
} from "@heroui/react";

import { Edit, Landmark } from "lucide-react";
import EditMpesaForm from "./edit-form";

export default function EditMpesa({ mpesa, user }: { mpesa: any; user: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Tooltip color="success" content="Edit Details">
        <button
          className=""
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <Edit className="h-6 w-6 text-green-600 hover:text-green-700" />
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
              <ModalHeader className="flex flex-col gap-1">
                Update Mpesa Transaction
              </ModalHeader>
              <ModalBody>
                <EditMpesaForm mpesa={mpesa} onClose={onClose} user={user} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
