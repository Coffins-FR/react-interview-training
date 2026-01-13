import React from "react";
import {
  Root,
  Trigger,
  Overlay,
  Content,
  Title,
  Description,
  Close,
  Portal,
} from "@radix-ui/react-dialog";
import Button, { type ButtonProps } from "../Button/Button";
import { X } from "lucide-react";

export interface ModalProps {
  title: string;
  description: string;
  buttonProps?: ButtonProps;
  children?: React.ReactNode;
}

const Modal = ({ title, description, buttonProps, children }: ModalProps) => {
  return (
    <Root>
      <Trigger asChild>
        <Button {...buttonProps} />
      </Trigger>
      <Portal>
        <Overlay className="fixed z-40 inset-0 bg-gray-500 opacity-50" />
        <Content className="p-4 flex flex-col bg-background rounded-lg shadow-lg z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-xl text-foreground max-h-[90vh] overflow-y-auto">
          <Close className="self-end p-1 bg-muted rounded-full cursor-pointer hover:bg-muted-foreground transition ease-in-out duration-200">
            <X className="w-4 h-4" />
          </Close>
          <div className="space-y-1 mb-4">
            <Title className="font-bold text-xl">{title}</Title>
            <Description className="italic">{description}</Description>
          </div>
          <div>{children}</div>
        </Content>
      </Portal>
    </Root>
  );
};

export default Modal;
