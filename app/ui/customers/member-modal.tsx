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
} from "@/app/ui/customers/member-modal-content";
import { EyeIcon } from "lucide-react";

export default function MemberModal({
  memberData,
  loan,
  group,
  isAddModalOpen,
  setIsAddModalOpen,
}: {
  memberData: any;
  loan: any;
  group: any;
  isAddModalOpen: any;
  setIsAddModalOpen: any;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const filteredLoans = loan
    ?.filter((item: any) => item?.memberid === memberData?.id)
    ?.sort((a: any, b: any) => b?.date.localeCompare(a?.date));

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
                Member Details
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div className="">
                    <LeftContent memberData={memberData} group={group} />
                  </div>
                  <div className="">
                    {" "}
                    <RightContent
                      memberData={memberData}
                      loans={filteredLoans}
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
