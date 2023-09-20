import { createContext, useContext, useState } from 'react';

const AlertContext = createContext({isOpen:false, message: "" } as any);

const AlertProvider = ({ children }: any) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [severity, setSeverity] = useState<string>('success');

    const alertMessage = (message: string, severity: string="success") => {
        setIsOpen(true);
        setMessage(message);
        setSeverity(severity);
    };
    
    const closeAlert = (reason: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpen(false);
    };
    
    
  return (
    <AlertContext.Provider
      value={{
        isOpen,
        message,
        severity,
        alertMessage,
        closeAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };
