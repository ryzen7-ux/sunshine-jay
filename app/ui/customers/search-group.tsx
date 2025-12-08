"use client";

import {
  Input,
  Link,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Form,
  NumberInput,
  Select,
  SelectItem,
  Button,
  Spinner,
  addToast,
} from "@heroui/react";
import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { createGroup, State } from "@/app/lib/sun-actions";

export default function SearchGroup({ regions }: { regions: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [selectRegion, setRegion] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    const formData = new FormData(e.currentTarget);
    const results = await createGroup(formData);

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
  return (
    <div className="py-4 flex gap-4">
      <Input
        placeholder="Search group...."
        radius="lg"
        size="md"
        variant="faded"
        color="success"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
        startContent={<Search className="h-6 w-6 text-gray-600" />}
      />
      <Button
        onPress={() => setIsModalOpen(true)}
        className="flex h-10 md:w-48 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        <span className="hidden md:block">Create Group</span>{" "}
        <Plus className="h-5 md:ml-4" />
      </Button>
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
                Add Group
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <div className="flex flex-col  px-6 w-full">
                    <div className="flex flex-col md:flex-row  gap-4">
                      <div className="w-full">
                        <Input
                          isRequired
                          name="reg"
                          type="text"
                          className="outline-2 outline-blue-500  "
                          label="Registration No/Code"
                          labelPlacement="outside"
                          color="success"
                          size="md"
                          description="Example: GRP001"
                          variant="faded"
                        />
                        <div
                          id="customer-error"
                          aria-live="polite"
                          aria-atomic="true"
                        ></div>
                      </div>
                      <div className="w-full">
                        <Input
                          isRequired
                          name="name"
                          type="text"
                          className="outline-2 outline-blue-500 mb-4 "
                          label="Name"
                          color="success"
                          labelPlacement="outside"
                          size="md"
                          variant="faded"
                        />
                        <div
                          id="customer-error"
                          aria-live="polite"
                          aria-atomic="true"
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 ">
                      <div className="w-full">
                        <Input
                          isRequired
                          name="location"
                          type="text"
                          className="outline-2 outline-blue-500  "
                          label="Location"
                          labelPlacement="outside"
                          color="success"
                          size="md"
                          variant="faded"
                        />
                        <div
                          id="customer-error"
                          aria-live="polite"
                          aria-atomic="true"
                        ></div>
                      </div>
                      <div className="w-full">
                        <Select
                          isRequired
                          name="region"
                          className=""
                          label="Group Region"
                          variant="faded"
                          size="md"
                          color="success"
                          labelPlacement="outside"
                          selectedKeys={[selectRegion]}
                          onChange={(e) => {
                            setRegion(e.target.value);
                          }}
                        >
                          {regions.map((region: any, index: any) => (
                            <SelectItem key={region.id}>
                              {region.name}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="my-6 py-6">
                      <Button
                        type="submit"
                        color="success"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Spinner color="default" size="md" className="py-4" />
                        ) : (
                          "Create Group"
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
    </div>
  );
}
