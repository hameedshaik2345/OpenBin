import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({ children, className = '' }) => {
  const { isOpen } = useContext(SidebarContext);
  
  return (
    <aside className={`w-64 bg-white border-r border-gray-200 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} ${className}`}>
      {children}
    </aside>
  );
};

export const SidebarHeader = ({ children, className = '' }) => {
  return (
    <div className={`border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const SidebarContent = ({ children, className = '' }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

export const SidebarGroup = ({ children, className = '' }) => {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
};

export const SidebarGroupContent = ({ children, className = '' }) => {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
};

export const SidebarMenu = ({ children, className = '' }) => {
  return (
    <nav className={`space-y-2 ${className}`}>
      {children}
    </nav>
  );
};

export const SidebarMenuItem = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const SidebarMenuButton = ({ children, className = '', asChild = false, ...props }) => {
  if (asChild) {
    return React.cloneElement(children, {
      className: `${children.props.className || ''} ${className}`,
      ...props
    });
  }
  
  return (
    <button className={`w-full ${className}`} {...props}>
      {children}
    </button>
  );
};

export const SidebarTrigger = ({ className = '' }) => {
  const { setIsOpen } = useContext(SidebarContext);
  
  return (
    <button
      onClick={() => setIsOpen(prev => !prev)}
      className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${className}`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
};
