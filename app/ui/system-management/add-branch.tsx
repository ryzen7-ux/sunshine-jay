"use client";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Form,
  Input,
  Spinner,
  addToast,
} from "@heroui/react";
import { Button } from "@heroui/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Send } from "lucide-react";
import { createBranch } from "@/app/lib/sun-actions2";

export default function AddBranch({ users }: { users: any }) {
  const [formData, setFormData] = useState({
    name: "",
    county: "",
  });
  const [isLoading, setIsloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { onOpenChange } = useDisclosure();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    const formData = new FormData(e.currentTarget);
    const results = await createBranch(formData);

    if (results?.success === false) {
      setIsloading(false);
      addToast({
        title: "Error !",
        description: results?.message,
        color: "danger",
      });
    } else {
      setIsloading(false);
      addToast({
        title: "Success!",
        description: results?.message,
        color: "success",
      });
      setIsModalOpen(false);
    }
  };

  const filtredUsers = users?.filter(
    (user: any) => user.name !== "henry-admin",
  );
  return (
    <>
      <div className="flex justify-between w-full py-4">
        <div className="flex items-center gap-1">
          <Send className="h-5 w-5 text-indigo-800" />
          <p className="text-md font-bold">Manage Branches</p>
        </div>
        <Button
          color="success"
          size="sm"
          className="w-1/2 md:w-1/4"
          onPress={() => setIsModalOpen(true)}
          startContent={<PlusIcon className="h-6 w-6" />}
        >
          ADD BRANCH
        </Button>
      </div>
      {/* Is add branch Modal */}
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
                Add Branch
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <div className="flex flex-col py-4  rounded-md  w-full">
                    <div className="flex flex-col md:flex-row  gap-4">
                      <div className="w-full">
                        <Input
                          isRequired
                          name="name"
                          type="text"
                          className="outline-2 outline-blue-500  "
                          label="Name"
                          labelPlacement="outside"
                          placeholder=""
                          color="success"
                          size="md"
                          variant="faded"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="my-6 py-6 flex gap-4">
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        type="submit"
                        color="success"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Spinner color="default" size="md" className="py-4" />
                        ) : (
                          "Add Branch"
                        )}
                      </Button>
                    </div>
                  </div>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
