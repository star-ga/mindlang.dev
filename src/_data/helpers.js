module.exports = {
  /**
   * Returns back some attributes based on whether the
   * link is active or a parent of an active item
   *
   * @param {String} itemUrl The link in question
   * @param {String} pageUrl The page context
   * @returns {String} The attributes or empty
   */
  getLinkActiveState(itemUrl, pageUrl) {
    let response = '';

    if (itemUrl === pageUrl) {
      response = ' aria-current="page"';
    }

    if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
      response += ' data-state="active"';
    }

    return response;
  },

  getBreadcrumbs(pageUrl) {
    if (!pageUrl) return [];
    const parts = pageUrl.split('/').filter(Boolean);
    const breadcrumbs = [];
    let currentPath = '';

    parts.forEach((part, index) => {
      currentPath += `/${part}`;
      let title = part.replace(/-/g, ' ');
      title = title.charAt(0).toUpperCase() + title.slice(1);
      
      if (part === 'docs') title = 'Documentation';
      if (part === 'std') title = 'Standard Library';
      if (part === 'spec') title = 'Language Spec';

      breadcrumbs.push({
        title: title,
        href: currentPath + '/',
        isLast: index === parts.length - 1
      });
    });

    return breadcrumbs;
  },

  /**
   * Get previous and next documentation pages for pagination
   * @param {String} pageUrl The current page URL
   * @param {Array} docsNav The docs navigation structure
   * @returns {Object} Object with prev and next page info
   */
  getDocsPagination(pageUrl, docsNav) {
    if (!pageUrl || !docsNav) return { prev: null, next: null };

    // Flatten the navigation structure into a single ordered array
    const allDocs = [];
    docsNav.forEach(section => {
      section.items.forEach(item => {
        allDocs.push({
          title: item.name,
          href: item.href
        });
      });
    });

    // Find current page index
    const currentIndex = allDocs.findIndex(doc => doc.href === pageUrl);
    
    if (currentIndex === -1) return { prev: null, next: null };

    return {
      prev: currentIndex > 0 ? allDocs[currentIndex - 1] : null,
      next: currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null
    };
  }
};
