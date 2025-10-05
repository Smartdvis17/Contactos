
import { Icon } from '@iconify/react/dist/iconify.js'
import { useTheme } from '../hooks/useTheme'

export const ContactsTable = ({ contacts, deleteContact, selectContact }) => {
  const { theme } = useTheme();
  
  return (
    <div className="w-full">
      <div className={`${theme.card} border rounded-2xl shadow-2xl overflow-hidden`}>
        {/* Header */}
        <div className={`${theme.cardHeader} px-8 py-6 border-b`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-xl shadow-sm border ${theme.buttonSecondary}`}>
                <Icon 
                  icon="lucide:users" 
                  className={theme.icon}
                  fontSize={24}
                />
              </div>
              <div>
                <h2 className={`text-xl font-semibold ${theme.tableText}`}>Directorio de Contactos</h2>
                <p className={`text-sm mt-0.5 ${theme.headerSubtext}`}>
                  {contacts.length} contacto{contacts.length !== 1 ? 's' : ''} registrado{contacts.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`text-sm ${theme.headerSubtext}`}>
                Total: <span className={`font-medium ${theme.tableSecondaryText}`}>{contacts.length}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Table */}
        {contacts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className={`min-w-full ${theme.table}`}>
              <thead className={theme.tableHeader}>
                <tr>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider border-b ${theme.tableHeaderText}`}>
                    Contacto
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider border-b ${theme.tableHeaderText}`}>
                    Información
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider border-b ${theme.tableHeaderText}`}>
                    Empresa
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider border-b ${theme.tableHeaderText}`}>
                    Ubicación
                  </th>
                  <th className={`px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider border-b ${theme.tableHeaderText}`}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className={theme.table}>
                {contacts.map((contact, index) => (
                  <tr 
                    key={contact.id} 
                    className={`${theme.tableRow} transition-all duration-200 group`}
                  >
                    {/* Contacto */}
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          {contact.photoUrl ? (
                            <div className="relative">
                              <img 
                                className={`h-12 w-12 rounded-xl object-cover border-2 shadow-sm group-hover:shadow-md transition-all duration-200 ${theme.cardHeader.includes('zinc') ? 'border-zinc-600' : 'border-gray-300'}`}
                                src={contact.photoUrl} 
                                alt={`${contact.firstName} ${contact.lastName}`}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                              <div 
                                className={`h-12 w-12 rounded-xl items-center justify-center border-2 shadow-sm hidden ${theme.cardHeader.includes('zinc') ? 'bg-zinc-700 border-zinc-600' : 'bg-gray-200 border-gray-300'}`}
                              >
                                <span className={`text-sm font-medium ${theme.tableSecondaryText}`}>
                                  {contact.firstName.charAt(0).toUpperCase()}{contact.lastName.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div 
                              className={`h-12 w-12 rounded-xl flex items-center justify-center border-2 shadow-sm ${theme.cardHeader.includes('zinc') ? 'bg-zinc-700 border-zinc-600' : 'bg-gray-200 border-gray-300'}`}
                            >
                              <span className={`text-sm font-medium ${theme.tableSecondaryText}`}>
                                {contact.firstName.charAt(0).toUpperCase()}{contact.lastName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div className={`absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 rounded-full ${theme.cardHeader.includes('zinc') ? 'border-zinc-900' : 'border-white'}`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs font-medium px-2 py-1 rounded-md ${theme.cardHeader.includes('zinc') ? 'text-zinc-400 bg-zinc-800' : 'text-gray-500 bg-gray-100'}`}>
                              #{index + 1}
                            </span>
                          </div>
                          <p className={`text-base font-semibold mt-1 ${theme.tableText}`}>
                            {contact.firstName} {contact.lastName}
                          </p>
                          {contact.notes && (
                            <p className={`text-sm truncate max-w-xs mt-1 ${theme.tableTertiaryText}`}>
                              {contact.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Información */}
                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Icon icon="lucide:mail" className={theme.iconSecondary} fontSize={14} />
                          <span className={`text-sm ${theme.tableSecondaryText}`}>{contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon icon="lucide:phone" className={theme.iconSecondary} fontSize={14} />
                          <span className={`text-sm ${theme.tableSecondaryText}`}>{contact.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Empresa */}
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-2">
                        <Icon icon="lucide:building-2" className={theme.iconSecondary} fontSize={16} />
                        <span className={`text-sm font-medium ${theme.tableSecondaryText}`}>
                          {contact.company || 'Sin empresa'}
                        </span>
                      </div>
                    </td>

                    {/* Ubicación */}
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-2">
                        <Icon icon="lucide:map-pin" className={theme.iconSecondary} fontSize={14} />
                        <span className={`text-sm max-w-xs truncate ${theme.tableTertiaryText}`}>
                          {contact.address || 'Sin dirección'}
                        </span>
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => selectContact(contact)}
                          className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 border ${theme.buttonSecondary}`}
                          title="Editar contacto"
                        >
                          <Icon icon="lucide:edit-3" fontSize={16} />
                        </button>
                        <button
                          onClick={() => deleteContact(contact.id)}
                          className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 border ${theme.buttonDelete}`}
                          title="Eliminar contacto"
                        >
                          <Icon icon="lucide:trash-2" fontSize={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Estado vacío */
          <div className="text-center py-16 px-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${theme.cardHeader}`}>
              <Icon 
                icon="lucide:users" 
                className={theme.emptyStateIcon}
                fontSize={32}
              />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${theme.tableText}`}>
              No hay contactos registrados
            </h3>
            <p className={`max-w-sm mx-auto mb-6 ${theme.emptyState}`}>
              Tu directorio está vacío. Agrega tu primer contacto usando el formulario de arriba para comenzar a organizar tu red de contactos.
            </p>
            <div className={`inline-flex items-center text-sm px-4 py-2 rounded-lg border ${theme.cardHeader}`}>
              <Icon icon="lucide:arrow-up" className="mr-2" fontSize={16} />
              <span className={theme.tableSecondaryText}>Usa el formulario de arriba para agregar contactos</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};