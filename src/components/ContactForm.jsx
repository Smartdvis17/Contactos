
import { Icon } from '@iconify/react/dist/iconify.js'
import { useTheme } from '../hooks/useTheme'

export const ContactForm = ({ 
  contactForm, 
  handleChange, 
  handleSubmit, 
  isEditContact, 
  resetForm,
  inputRef 
}) => {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme.card} border rounded-xl shadow-2xl`}>
      {/* Header compacto */}
      <div className={`${theme.cardHeader} border-b px-6 py-4 rounded-t-xl`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon 
              icon={isEditContact ? "lucide:user-check" : "lucide:user-plus"}
              className={theme.icon}
              fontSize={20}
            />
            <div>
              <h2 className={`text-lg font-semibold ${theme.tableText}`}>
                {isEditContact ? 'Editar Contacto' : 'Nuevo Contacto'}
              </h2>
            </div>
          </div>
          
          {isEditContact && (
            <button
              type="button"
              onClick={resetForm}
              className={`p-1 rounded transition-colors ${theme.iconSecondary} hover:${theme.tableText}`}
              title="Cancelar edición"
            >
              <Icon icon="lucide:x" fontSize={18} />
            </button>
          )}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Nombre */}
          <div>
            <label className={`flex items-center text-sm font-medium mb-1 ${theme.label}`}>
              <Icon icon="lucide:user" className={`mr-1 ${theme.iconSecondary}`} fontSize={14} />
              Nombre *
            </label>
            <input
              ref={inputRef}
              type="text"
              name="firstName"
              value={contactForm.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 transition-all text-sm ${theme.input}`}
              placeholder="Nombre"
              required
              autoFocus
            />
          </div>
          
          {/* Apellido */}
          <div>
            <label className={`flex items-center text-sm font-medium mb-1 ${theme.label}`}>
              <Icon icon="lucide:user" className={`mr-1 ${theme.iconSecondary}`} fontSize={14} />
              Apellido *
            </label>
            <input
              type="text"
              name="lastName"
              value={contactForm.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 transition-all text-sm ${theme.input}`}
              placeholder="Apellido"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className={`flex items-center text-sm font-medium mb-1 ${theme.label}`}>
              <Icon icon="lucide:mail" className={`mr-1 ${theme.iconSecondary}`} fontSize={14} />
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={contactForm.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 transition-all text-sm ${theme.input}`}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className={`flex items-center text-sm font-medium mb-1 ${theme.label}`}>
              <Icon icon="lucide:phone" className={`mr-1 ${theme.iconSecondary}`} fontSize={14} />
              Teléfono *
            </label>
            <input
              type="tel"
              name="phone"
              value={contactForm.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 transition-all text-sm ${theme.input}`}
              placeholder="+57 310 123 4567"
              required
            />
          </div>

          {/* Empresa */}
          <div>
            <label className={`flex items-center text-sm font-medium mb-1 ${theme.label}`}>
              <Icon icon="lucide:building-2" className={`mr-1 ${theme.iconSecondary}`} fontSize={14} />
              Empresa
            </label>
            <input
              type="text"
              name="company"
              value={contactForm.company}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 transition-all text-sm ${theme.input}`}
              placeholder="Empresa"
            />
          </div>

          {/* Foto */}
          <div>
            <label className={`flex items-center text-sm font-medium mb-1 ${theme.label}`}>
              <Icon icon="lucide:camera" className={`mr-1 ${theme.iconSecondary}`} fontSize={14} />
              Foto URL
            </label>
            <input
              type="url"
              name="photoUrl"
              value={contactForm.photoUrl}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 transition-all text-sm ${theme.input}`}
              placeholder="URL de imagen"
            />
          </div>

          {/* Dirección - span 2 columnas */}
          <div className="md:col-span-2">
            <label className={`flex items-center text-sm font-medium mb-1 ${theme.label}`}>
              <Icon icon="lucide:map-pin" className={`mr-1 ${theme.iconSecondary}`} fontSize={14} />
              Dirección
            </label>
            <input
              type="text"
              name="address"
              value={contactForm.address}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 transition-all text-sm ${theme.input}`}
              placeholder="Calle, Ciudad, Estado"
            />
          </div>

          {/* Notas - span 3 columnas */}
          <div className="md:col-span-2 lg:col-span-3">
            <label className={`flex items-center text-sm font-medium mb-1 ${theme.label}`}>
              <Icon icon="lucide:sticky-note" className={`mr-1 ${theme.iconSecondary}`} fontSize={14} />
              Notas
            </label>
            <textarea
              name="notes"
              value={contactForm.notes}
              onChange={handleChange}
              rows={2}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 transition-all resize-none text-sm ${theme.input}`}
              placeholder="Notas adicionales..."
            />
          </div>
        </div>

        {/* Botón de acción */}
        <div className={`flex justify-end pt-4 mt-4 border-t ${theme.cardHeader.includes('zinc') ? 'border-zinc-700' : 'border-gray-200'}`}>
          <button
            type="submit"
            className={`inline-flex items-center px-6 py-2 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 text-sm ${theme.buttonPrimary}`}
          >
            <Icon 
              icon={isEditContact ? "lucide:save" : "lucide:plus"} 
              className="mr-2" 
              fontSize={16}
            />
            {isEditContact ? 'Actualizar' : 'Agregar'}
          </button>
        </div>
      </form>
    </div>
  );
};