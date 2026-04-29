import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Avatar,
  Slider,
  Badge,
  Image,
} from "@heroui/react";

import { MemberForm } from "@/app/lib/sun-defination";
import {
  DocumentDuplicateIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { Camera, FileCheck2, FileCheck, Eye, Banknote } from "lucide-react";
import MemberDetails from "./member-details";
import { formatCurrencyToLocal, formatDateToLocal } from "@/app/lib/utils";
import { UpdateLoan, DeleteLoan } from "@/app/ui/loans/buttons";
import InvoiceStatus from "@/app/ui/loans/status";
import MemberStatus from "@/app/ui/customers/status";
import { MemberLoanTable } from "@/app/ui/customers/member-loans-table";
import { useState } from "react";
import { set } from "zod";

export function LeftContent({
  memberData,
  group,
}: {
  memberData: any;
  group: any;
}) {
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const { onOpenChange } = useDisclosure();

  return (
    <>
      <div className="w-full border rounded-md py-4">
        <div className="flex flex-col gap-3 pb-4 px-2">
          <div className="flex gap-3">
            <Avatar className="w-40 h-40 text-large mb-auto" />
            <div className="flex flex-col">
              <p className="text-lg font-bold text-default-900 ">
                {memberData.firstname} {memberData.surname} {memberData.name}
              </p>
              <p className="pt-1 text-sm text-default-600 ">
                <strong>Membership Status:</strong>{" "}
                <MemberStatus status={memberData.status} />
              </p>
              <p className="pt-1 text-sm text-default-600 ">
                <strong>ID Number:</strong> {memberData.idnumber}
              </p>
              <p className="pt-1 text-sm text-default-600 ">
                <strong>Group:</strong> {group.name}
              </p>
              <p className="pt-1 text-sm text-default-600 ">
                <strong>Business Nature:</strong> {memberData.nature}
              </p>
              <p className="pt-1 text-sm text-default-600">
                {memberData?.regionname && <>Region: {memberData.regionname}</>}
              </p>

              <p className="flex text-small text-default-500 p-1 pb-4">
                <span>
                  <PhoneIcon className="w-5 font-bold" />
                </span>
                <span className="pl-1">{memberData.phone}</span>
              </p>
            </div>
          </div>
          <div>
            <hr className="border-green-300" />
            <h1 className="py-2 text-sm uppercase">
              <strong>Next of kin details</strong>
            </h1>
            <hr className="border-green-300" />
            <p className="pt-1 text-sm text-default-600 ">
              <strong>Name:</strong> {memberData.kin_name}
            </p>
            <p className=" text-sm text-default-600 pt-1">
              <strong>ID Number:</strong> {memberData.kin_id}
            </p>
            <p className="text-sm text-default-600 pt-1">
              <strong>Relationship:</strong> {memberData.kin_relationship}
            </p>

            <p className="pt-1 text-sm text-default-600 ">
              <strong>Phone Number:</strong> {memberData.kin_phone}
            </p>
          </div>
          <hr className="border-green-300" />
          <Button
            color="warning"
            startContent={<DocumentDuplicateIcon className="h-6 w-6" />}
            onPress={() => setIsDocModalOpen(true)}
          >
            VIEW DOCUMENTS
          </Button>
        </div>
      </div>
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
                MEMBER DOCUMENTS
              </ModalHeader>
              <ModalBody>
                <div className="w-full">
                  <div className="flex px-4 py-2">
                    <div className="text-green-500">
                      <FileCheck2 />
                    </div>
                    <p className="px-2 uppercase">
                      {`${memberData.firstname ?? ""} ${memberData.surname ?? ""} ${memberData.name ?? ""}`}{" "}
                      Documents
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    {memberData.passport ? (
                      <div className="flex flex-col items-center">
                        <h1 className="font-extrabold">PASSPORT</h1>
                        <Image
                          isZoomed
                          src={`${memberData.passport}`}
                          alt="No image"
                          className="w-full"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center border border-green-500 rounded-md text-green-700">
                        No passport
                      </div>
                    )}
                    {memberData.id_front ? (
                      <div className="flex flex-col items-center">
                        <h1 className="font-extrabold">ID FRONT</h1>
                        <Image
                          isZoomed
                          src={`${memberData.id_front}`}
                          alt="No image"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center border border-green-500 rounded-md text-green-700">
                        No ID Front
                      </div>
                    )}
                    {memberData.id_back ? (
                      <div className="flex flex-col items-center">
                        <h1 className="font-extrabold">ID BACK</h1>
                        <Image
                          isZoomed
                          src={`${memberData.id_back}`}
                          alt="No image"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center border border-green-500 rounded-md text-green-700">
                        No ID Back
                      </div>
                    )}
                    {memberData.doc ? (
                      <div className="border rounded-lg py-4">
                        {" "}
                        <div className="flex flex-col items-center justify-center gap-4">
                          <FileCheck className="h-12 w-12 text-green-600" />
                          <div className="text-center">
                            <p className="text-sm  text-muted-foreground mb-4">
                              Application FORM Document
                            </p>
                            <a
                              href={memberData.doc}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block px-4 py-2 bg-green-600 text-primary-foreground rounded hover:bg-green-500  text-sm"
                            >
                              Download PDF
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center border border-green-500 rounded-md text-green-700">
                        No application form
                      </div>
                    )}
                    {memberData.business_photo ? (
                      <div className="flex flex-col items-center">
                        <h1 className="font-extrabold">BUSINESS</h1>
                        <Image
                          isZoomed
                          src={`${memberData.business_photo}`}
                          alt="No image"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center border border-green-500 rounded-md text-green-700">
                        No Business photo
                      </div>
                    )}
                    {memberData.kin_photo ? (
                      <div className="flex flex-col items-center">
                        <h1 className="font-extrabold">NEXT OF KIN</h1>
                        <Image
                          isZoomed
                          src={`${memberData.kin_photo}`}
                          alt="No image"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center border border-green-500 rounded-md text-green-700">
                        No next of kin photo
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
    </>
  );
}

export function RightContent({
  memberData,
  loans,
}: {
  memberData: MemberForm;
  loans: any;
}) {
  return (
    <div className=" border rounded-md px-1.5">
      <div className="flex p-4">
        <div className="text-green-500">
          <Banknote className="" />
        </div>
        <p className="px-2">Loans</p>
      </div>

      {loans.length > 0 ? (
        <MemberLoanTable loan={loans} />
      ) : (
        <p className="text-center justify-center text-sm">
          Member has no loans
        </p>
      )}
    </div>
  );
}
