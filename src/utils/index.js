// Utility functions for the OpenBin app

export const createPageUrl = (pageName) => {
  const urlMap = {
    'Landing': '/',
    'Auth': '/auth',
    'Dashboard': '/dashboard',
    'SchedulePickup': '/schedule-pickup',
    'Rewards': '/rewards',
    'FindBins': '/find-bins',
    'Community': '/community',
    'Profile': '/profile',
    'Admin': '/admin',
    'Contact': '/contact'
  };
  
  return urlMap[pageName] || '/';
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const generateUserId = () => {
  return 'user-' + Math.random().toString(36).substring(2, 15);
};
