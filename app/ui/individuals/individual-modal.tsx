"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@heroui/react";
import Image from "next/image";
import {
  LeftContent,
  RightContent,
} from "@/app/ui/individuals/details-modal-content";
import { EyeIcon } from "lucide-react";
import { fetchIndividualDetailsLoans } from "@/app/lib/data/sun-data2";

export default function IndividualModal({
  memberData,
  loan,
  isAddModalOpen,
  setIsAddModalOpen,
  isLoading,
  setIsLoading,
}: {
  memberData: any;
  loan: any;
  isAddModalOpen: any;
  setIsAddModalOpen: any;
  isLoading: any;
  setIsLoading: any;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Modal
        isOpen={isAddModalOpen}
        onOpenChange={onOpenChange}
        size="full"
        className="overflow-auto"
        onClose={() => setIsAddModalOpen(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 uppercase font-extrabold">
                Loanee Details
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div className="">
                    <LeftContent memberData={memberData} group={[]} />
                  </div>
                  <div className="">
                    {" "}
                    <RightContent
                      memberData={memberData}
                      loans={loan}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
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
    </>
  );
}
