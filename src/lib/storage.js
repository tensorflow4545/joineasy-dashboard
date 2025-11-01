import { INITIAL_ASSIGNMENTS } from './mockData'

export const getAssignments = () => {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem('assignments')
  if (stored) {
    return JSON.parse(stored)
  }
  localStorage.setItem('assignments', JSON.stringify(INITIAL_ASSIGNMENTS))
  return INITIAL_ASSIGNMENTS
}

export const saveAssignments = (assignments) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('assignments', JSON.stringify(assignments))
}

export const getSubmissions = () => {
  if (typeof window === 'undefined') return {}
  const stored = localStorage.getItem('submissions')
  return stored ? JSON.parse(stored) : {}
}

export const saveSubmissions = (submissions) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('submissions', JSON.stringify(submissions))
}

export const getStoredUser = () => {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem('currentUser')
  return stored ? JSON.parse(stored) : null
}

export const saveUser = (user) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('currentUser', JSON.stringify(user))
}

export const clearUser = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('currentUser')
}