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
};
