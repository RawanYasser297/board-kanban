import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
/**
 * @fileoverview A React component that implements a modal dialog for editing a user profile,
 * utilizing components from a UI library (e.g., Radix UI, RaxUI).
 * The dialog is triggered by an "Edit profile" button and contains input fields for Name and Email.
 *
 * @component
 * @returns {JSX.Element} A dialog component ready to be rendered.
 */
const DialogModel = ({ dialog, children }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className={dialog.style}>{dialog.name}</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
          <Dialog.Title  className="mb-5">{dialog.title}</Dialog.Title>
          <div>{children}</div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogModel;
