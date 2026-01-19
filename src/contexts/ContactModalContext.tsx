import { createContext, useContext, useState, ReactNode } from "react";
import ContactFormModal from "@/components/ContactFormModal";

interface ContactModalContextType {
  openContactModal: () => void;
  closeContactModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export const useContactModal = () => {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return context;
};

interface ContactModalProviderProps {
  children: ReactNode;
}

export const ContactModalProvider = ({ children }: ContactModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openContactModal = () => setIsOpen(true);
  const closeContactModal = () => setIsOpen(false);

  return (
    <ContactModalContext.Provider value={{ openContactModal, closeContactModal }}>
      {children}
      <ContactFormModal open={isOpen} onOpenChange={setIsOpen} />
    </ContactModalContext.Provider>
  );
};
