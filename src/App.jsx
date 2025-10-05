import { useCallback, useRef, useState } from "react";
import { ContactsTable } from "./components/ContactsTable";
import { ContactForm } from "./components/ContactForm";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { useTheme } from "./hooks/useTheme";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import { Icon } from '@iconify/react/dist/iconify.js';

// * ESTADO INICIAL DEL FORMULARIO PARA CONTACTOS
const initialContactState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  photoUrl: "",
  company: "",
  notes: "",
};

// Componente principal del contenido
const AppContent = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  // ** ESTADO PARA GUARDAR LA DATA DEL FORMULARIO DE CONTACTO
  const [contactForm, setContactForm] = useState(initialContactState);
  // ** ESTADO PARA VERIFICAR SI ES EDICION O CREACION
  const [isEditContact, setIsEditContact] = useState(false);
  //** ESTADO DE LOS CONTACTOS
  const [contacts, setContacts] = useState([
    {
      id: 1,
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan.perez@email.com",
      phone: "+57 310 123 4567",
      address: "Av. 33 #45-67, Bogotá-Colombia",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      company: "Tech Solutions",
      notes: "Cliente importante, contacto directo del proyecto principal",
    },
    {
      id: 2,
      firstName: "María",
      lastName: "González",
      email: "maria.gonzalez@email.com",
      phone: "+57 310 555 1234",
      address: "Calle Maracaibo, Medellín-Colombia",
      photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      company: "Marketing Digital",
      notes: "Especialista en marketing digital y redes sociales",
    },
  ]);

  const inputRef = useRef(null);

  const handleChange = useCallback(
    (e) => {
      setContactForm({ ...contactForm, [e.target.name]: e.target.value });
    },
    [contactForm]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    isEditContact ? updateContact() : addContact();
  };

  const addContact = () => {
    const idContact = contacts.length
      ? contacts[contacts.length - 1].id + 1
      : 1;
    setContacts([...contacts, { id: idContact, ...contactForm }]);
    resetForm();
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Contacto agregado exitosamente`,
      text: `${contactForm.firstName} ${contactForm.lastName} ha sido agregado a tu directorio`,
      showConfirmButton: false,
      timer: 3000,
    });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 9999,
    });
  };

  const deleteContact = (id) => {
    const contactToDelete = contacts.find(contact => contact.id === id);
    Swal.fire({
      title: "¿Eliminar contacto?",
      text: `¿Estás seguro de que quieres eliminar a ${contactToDelete?.firstName} ${contactToDelete?.lastName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      buttonsStyling: true,
      reverseButtons: true,
      focusConfirm: false,
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Contacto eliminado",
          text: "El contacto ha sido eliminado exitosamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        const newContacts = contacts.filter((contact) => contact.id !== id);
        setContacts(newContacts);
      }
    });
  };

  const selectContact = (contact) => {
    setContactForm(contact);
    setIsEditContact(true);
    inputRef.current?.focus();
  };

  const updateContact = () => {
    const newContacts = contacts.map((contact) => {
      if (contact.id === contactForm.id) {
        return contactForm;
      }
      return contact;
    });
    setContacts(newContacts);
    resetForm();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Contacto actualizado",
      text: `Los datos de ${contactForm.firstName} ${contactForm.lastName} han sido actualizados`,
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const resetForm = () => {
    setContactForm(initialContactState);
    setIsEditContact(false);
    inputRef.current?.focus();
  };

  return (
    <div className={theme.container}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-6">
            <div></div> {/* Spacer */}
            
            {/* Botón de cambio de tema */}
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 border ${theme.toggleButton}`}
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              <Icon 
                icon={isDarkMode ? 'lucide:sun' : 'lucide:moon'} 
                className="mr-2" 
                fontSize={18} 
              />
              <span className="text-sm font-medium">
                {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
              </span>
            </button>
          </div>
          
          <div className={`inline-flex items-center justify-center p-4 rounded-2xl shadow-xl mb-6 border ${theme.cardHeader}`}>
            <Icon 
              icon="lucide:address-book" 
              className={theme.icon}
              fontSize={32}
            />
            <div className="text-left ml-3">
              <h1 className={`text-2xl font-bold ${theme.tableText}`}>
                Directorio de Contactos
              </h1>
              <p className={`text-sm text-center ${theme.headerSubtext}`}>
                Sistema de gestión profesional
              </p>
            </div>
          </div>
          
          <p className={`text-lg max-w-2xl mx-auto mb-6 ${theme.tableSecondaryText}`}>
            Organiza y gestiona tu red de contactos profesionales de manera eficiente y segura
          </p>
          
          <div className="inline-flex items-center space-x-6 text-sm">
            <div className={`flex items-center px-4 py-2 rounded-lg shadow-lg border ${theme.cardHeader}`}>
              <Icon icon="lucide:users" className={`mr-2 ${theme.iconSecondary}`} fontSize={16} />
              <span className={`font-medium ${theme.tableText}`}>{contacts.length}</span>
              <span className={`ml-1 ${theme.tableSecondaryText}`}>contacto{contacts.length !== 1 ? 's' : ''}</span>
            </div>
            <div className={`flex items-center px-4 py-2 rounded-lg shadow-lg border ${theme.cardHeader}`}>
              <Icon icon="lucide:shield-check" className="mr-2 text-green-400" fontSize={16} />
              <span className={theme.tableSecondaryText}>Datos seguros</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Formulario de contacto */}
          <ContactForm
            contactForm={contactForm}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isEditContact={isEditContact}
            resetForm={resetForm}
            inputRef={inputRef}
          />

          {/* Tabla de contactos */}
          <ContactsTable
            contacts={contacts}
            deleteContact={deleteContact}
            selectContact={selectContact}
          />
        </div>
        
        {/* Footer */}
        <div className={`text-center mt-16 py-8 border-t ${theme.cardHeader.includes('zinc') ? 'border-zinc-700' : 'border-gray-200'}`}>
          <p className={`text-sm ${theme.headerSubtext}`}>
            © 2025 Directorio de Contactos. Diseñado para la gestión profesional de contactos.
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente App principal que envuelve todo con ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;