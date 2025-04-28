const API_BASE_URL = 'https://solo-project-chingu.onrender.com/api'

const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token')
  const isAdminRoute = url.startsWith(API_BASE_URL + '/admin/')
  const isExcludedRoute = (url === API_BASE_URL + '/admin/login' || url === API_BASE_URL + '/admin/home') && options.method === 'GET'

  if (token && isAdminRoute && !isExcludedRoute) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    }
  }

  const res = await fetch(url, options)

  if (res.status === 401 && !url.includes('/api/products') && !url.includes('/api/public') && !url.includes('/api/admin/login')) {
    window.location.href = '/admin/login'
    return res
  }

  return res
};

export { API_BASE_URL, authFetch as default }
