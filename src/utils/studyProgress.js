// LocalStorage study progress manager

const STORAGE_KEY = 'aws_clf_c02_study_progress';
const BOOKMARKS_KEY = 'aws_clf_c02_bookmarks';

export function getStudyProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function toggleSectionMastery(sectionId) {
  const current = getStudyProgress();
  const updated = {
    ...current,
    [sectionId]: !current[sectionId]
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {}
  return updated;
}

export function getBookmarks() {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleBookmark(item) {
  const bookmarks = getBookmarks();
  const existsIndex = bookmarks.findIndex(b => b.id === item.id);
  let updated;
  if (existsIndex >= 0) {
    updated = bookmarks.filter(b => b.id !== item.id);
  } else {
    updated = [...bookmarks, item];
  }
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  } catch (e) {}
  return updated;
}

