"use client";

import {
  Form,
  Input,
  Button,
  Spinner,
  addToast,
  NumberInput,
} from "@heroui/react";
import { useActionState, useState } from "react";
import { createMembers, MembersState } from "@/app/lib/sun-actions";
import React from "react";

export default function MemberForm({
  groupId,
  onClose,
}: {
  groupId: string;
  onClose: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, type: "", message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await createMembers(formData);

    if (res?.success === false) {
      setIsLoading(false);
      if (res?.success == false) {
        addToast({
          title: "Error !",
          description: res.message,
          color: "danger",
        });
      } else {
        setIsLoading(false);
        addToast({
          title: "Error !",
          description: res?.message,
          color: "danger",
        });
      }
    }

    if (res?.success === true) {
      addToast({
        title: "Success !",
        description: res?.message,
        color: "success",
      });
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex flex-col  w-full">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 pb-4">
          <div className="w-full">
            <NumberInput
              isRequired
              name="idNumber"
              className="outline-2 outline-blue-500 "
              label="ID Number"
              color="success"
              labelPlacement="outside"
              size="md"
              variant="faded"
              placeholder="0"
              formatOptions={{ useGrouping: false }}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small"></span>
                </div>
              }
            />
          </div>
          <div className="w-full">
            <Input
              isRequired
              name="firstName"
              type="text"
              className="outline-2 outline-blue-500"
              label="Name"
              color="success"
              labelPlacement="outside"
              size="md"
              variant="faded"
            />
          </div>
          <div className="w-full">
            <Input
              isRequired
              name="phone"
              type="text"
              className="outline-2 outline-blue-500  "
              label="Phone number"
              labelPlacement="outside"
              color="success"
              size="md"
              variant="faded"
            />
          </div>
          <div className="w-full">
            <Input
              name="nature"
              type="text"
              className="outline-2 outline-blue-500  "
              label="Nature of business"
              labelPlacement="outside"
              color="success"
              size="md"
              variant="faded"
            />
          </div>
        </div>
        <hr />
        <h3 className="w-full py-2">Next of kin</h3>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          <div className="w-full ">
            <Input
              name="kin_relationship"
              type="text"
              className="outline-2 outline-blue-500  "
              label="Relationship"
              labelPlacement="outside"
              color="success"
              size="md"
              variant="faded"
              description="eg: Husband, son.. etc."
            />
          </div>
          <div className="w-full ">
            <Input
              name="kin_name"
              type="text"
              className="outline-2 outline-blue-500  "
              label="Name"
              labelPlacement="outside"
              color="success"
              size="md"
              variant="faded"
            />
          </div>
          <div className="w-full">
            <NumberInput
              name="kin_id"
              className="outline-2 outline-blue-500"
              label="ID Number"
              color="success"
              labelPlacement="outside"
              size="md"
              variant="faded"
              placeholder="0"
              formatOptions={{ useGrouping: false }}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small"></span>
                </div>
              }
            />
          </div>
          <div className="w-full ">
            <Input
              name="kin_phone"
              type="text"
              className="outline-2 outline-blue-500  "
              label="Phone Number"
              labelPlacement="outside"
              color="success"
              size="md"
              variant="faded"
            />
          </div>
        </div>

        <Input
          className="hidden"
          name="groupId"
          type="text"
          defaultValue={groupId}
        />
        <div className="my-6 py-6">
          <Button
            type="submit"
            color="success"
            className="w-full"
            disabled={isLoading}>
            {isLoading ? (
              <Spinner color="default" size="md" className="py-4" />
            ) : (
              "Add Member"
            )}
          </Button>
        </div>
      </div>
    </Form>
  );
}
